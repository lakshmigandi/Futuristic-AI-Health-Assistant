import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { DataInsight } from '../types/health';

interface VoiceNarratorProps {
  insights: DataInsight[];
  isVisible?: boolean;
}

/**
 * VoiceNarrator Component
 * 
 * Provides AI-powered voice narration of health insights using ElevenLabs API.
 * Features include play/pause controls, volume adjustment, and dynamic text generation.
 */
const VoiceNarrator: React.FC<VoiceNarratorProps> = ({ insights, isVisible = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate narrative text from insights
  const generateNarrative = (): string => {
    if (!insights.length) return "No health insights available for narration.";
    
    const narratives = [
      "Welcome to your AI Health Assistant. Let me share some important insights from your health data.",
      ...insights.map(insight => {
        const trendText = insight.trend === 'positive' ? 'positive trend' : 
                         insight.trend === 'negative' ? 'concerning trend' : 'stable pattern';
        return `${insight.title}: ${insight.description} This shows a ${trendText} with a value of ${insight.value}.`;
      }),
      "These insights can help guide your health decisions. Remember to consult with healthcare professionals for personalized advice."
    ];
    
    return narratives.join(' ');
  };

  // Call ElevenLabs API to generate speech
  const generateSpeech = async (text: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      throw new Error('ElevenLabs API key not configured. Please add VITE_ELEVENLABS_API_KEY to your environment variables.');
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Speech generation error:', error);
      throw error;
    }
  };

  // Handle play/pause functionality
  const handlePlayPause = async () => {
    if (isPlaying) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const narrative = generateNarrative();
      const audioUrl = await generateSpeech(narrative);
      
      // Create and play audio
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentInsightIndex(0);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setError('Failed to play audio. Please try again.');
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      audio.onloadeddata = () => {
        setIsLoading(false);
        audio.play();
        setIsPlaying(true);
      };
      
      if (!isMuted) {
        audio.volume = 0.8;
      } else {
        audio.volume = 0;
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate speech');
      setIsLoading(false);
    }
  };

  // Toggle mute
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0.8 : 0;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Volume2 className="h-8 w-8" />
          <div>
            <h3 className="text-2xl font-bold">AI Voice Narrator</h3>
            <p className="text-indigo-100">Listen to your personalized health insights</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleMuteToggle}
            className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>Play Insights</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Narrative Preview */}
      <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-sm">
        <h4 className="font-semibold mb-3 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Narrative Preview
        </h4>
        <p className="text-sm text-indigo-100 leading-relaxed">
          {generateNarrative().substring(0, 200)}...
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-300 rounded-lg">
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2 text-red-200">
            Make sure your ElevenLabs API key is configured in your environment variables.
          </p>
        </div>
      )}

      {/* Setup Instructions */}
      <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20">
        <h5 className="font-semibold mb-2">🔧 Setup Instructions</h5>
        <ol className="text-sm space-y-1 text-indigo-100">
          <li>1. Get your API key from <a href="https://elevenlabs.io" className="underline" target="_blank" rel="noopener noreferrer">ElevenLabs.io</a></li>
          <li>2. Add <code className="bg-black bg-opacity-30 px-1 rounded">VITE_ELEVENLABS_API_KEY=your_key_here</code> to your .env file</li>
          <li>3. Restart your development server</li>
        </ol>
      </div>
    </div>
  );
};

export default VoiceNarrator;