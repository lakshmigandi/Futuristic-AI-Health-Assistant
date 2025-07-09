import React, { useState } from 'react';
import { Github, ExternalLink, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * GitHubIntegration Component
 * 
 * Provides GitHub repository integration features for hackathon submission
 * including repository setup instructions and data export capabilities.
 */
const GitHubIntegration: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Generate project structure for GitHub
  const generateProjectStructure = () => {
    return `
# AI Health Assistant - Project Structure

## 📁 Project Organization
\`\`\`
ai-health-assistant/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── BarChart.tsx          # D3.js bar chart visualization
│   │   ├── LineChart.tsx         # D3.js line chart for trends
│   │   ├── ScatterPlot.tsx       # D3.js scatter plot for correlations
│   │   ├── MetricCard.tsx        # Health metrics display cards
│   │   ├── DataLoader.tsx        # CSV upload and URL fetching
│   │   ├── DataInsights.tsx      # AI-generated insights display
│   │   ├── VoiceNarrator.tsx     # ElevenLabs voice narration
│   │   ├── DataStoryTelling.tsx  # Narrative data presentation
│   │   └── GitHubIntegration.tsx # Repository integration
│   ├── data/
│   │   └── healthData.ts         # Sample health dataset
│   ├── types/
│   │   └── health.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── dataProcessing.ts     # Data analysis and processing
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Tailwind CSS imports
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # Project documentation
\`\`\`

## 🚀 Features
- **Interactive D3.js Visualizations**: Bar charts, line charts, and scatter plots
- **AI Voice Narration**: ElevenLabs integration for audio insights
- **Dynamic Data Loading**: CSV upload and GitHub URL fetching
- **Data Storytelling**: Narrative-driven health insights
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **TypeScript**: Full type safety and modern development experience

## 🛠️ Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Visualization**: D3.js v7.8
- **Voice**: ElevenLabs API
- **Build Tool**: Vite
- **Data Processing**: Custom algorithms for health analytics
`;
  };

  // Generate README content
  const generateReadme = () => {
    return `# 🏥 AI Personal Health Assistant

> An intelligent health data visualization platform with AI-powered insights and voice narration

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![D3.js](https://img.shields.io/badge/D3.js-7.8-orange.svg)](https://d3js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)

## 🌟 Features

### 📊 Interactive Visualizations
- **Bar Chart**: Average heart rate analysis by age group
- **Line Chart**: Step count trends over time with smooth animations
- **Scatter Plot**: Diabetes risk factor correlations with interactive tooltips

### 🎙️ AI Voice Narration
- **ElevenLabs Integration**: Professional voice synthesis
- **Dynamic Narratives**: AI-generated health insights explanations
- **Audio Controls**: Play, pause, and volume management

### 📈 Data Analytics
- **Smart Insights**: AI-powered pattern recognition
- **Risk Assessment**: Diabetes and cardiovascular risk analysis
- **Trend Analysis**: Temporal health pattern identification

### 📱 Modern UX/UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Accessibility**: Screen reader support and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- ElevenLabs API key (for voice features)

### Installation
\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/ai-health-assistant.git
cd ai-health-assistant

# Install dependencies
npm install

# Set up environment variables
echo "VITE_ELEVENLABS_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
\`\`\`

### ElevenLabs Setup
1. Sign up at [ElevenLabs.io](https://elevenlabs.io)
2. Get your API key from the dashboard
3. Add it to your \`.env\` file as \`VITE_ELEVENLABS_API_KEY\`

## 📊 Data Sources

### Supported Formats
- **CSV Upload**: Local file upload with drag-and-drop
- **GitHub URLs**: Direct fetching from public repositories
- **Expected Columns**: age, heartRate, stepCount, glucoseLevel, hasDiabetes, gender

### Sample Data Structure
\`\`\`csv
age,heartRate,stepCount,glucoseLevel,hasDiabetes,gender
25,72,8500,85,false,female
45,78,6200,110,false,male
60,82,4500,145,true,female
\`\`\`

## 🏗️ Architecture

### Component Structure
- **App.tsx**: Main application orchestrator
- **VoiceNarrator**: ElevenLabs voice integration
- **DataStoryTelling**: Narrative health insights
- **Visualization Components**: D3.js chart implementations
- **DataLoader**: CSV processing and URL fetching

### Data Flow
1. **Input**: CSV upload or URL fetch
2. **Processing**: Data validation and analysis
3. **Visualization**: D3.js chart rendering
4. **Insights**: AI pattern recognition
5. **Narration**: Voice synthesis and playback

## 🎯 Hackathon Highlights

### Innovation
- **AI-Powered Insights**: Machine learning-driven health pattern recognition
- **Voice Accessibility**: Audio narration for inclusive design
- **Real-time Processing**: Dynamic data analysis and visualization

### Technical Excellence
- **Modern Stack**: React 18, TypeScript, D3.js, Tailwind CSS
- **Performance**: Optimized rendering and data processing
- **Scalability**: Modular architecture for easy extension

### User Experience
- **Intuitive Interface**: Clean, professional design
- **Interactive Elements**: Engaging visualizations with tooltips
- **Accessibility**: Voice narration and keyboard navigation

## 📝 API Documentation

### ElevenLabs Integration
\`\`\`typescript
// Voice narration configuration
const voiceConfig = {
  model_id: 'eleven_monolingual_v1',
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.5,
    style: 0.0,
    use_speaker_boost: true
  }
};
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Submission

### Team Information
- **Project**: AI Personal Health Assistant
- **Category**: Healthcare Technology / Data Visualization
- **Tech Stack**: React, D3.js, ElevenLabs, TypeScript

### Demo Links
- **Live Demo**: [Your deployment URL]
- **Video Demo**: [Your demo video URL]
- **Presentation**: [Your presentation URL]

---

Built with ❤️ for better health outcomes through data visualization and AI insights.
`;
  };

  // Export project files
  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('idle');

    try {
      // Create downloadable files
      const files = [
        { name: 'README.md', content: generateReadme() },
        { name: 'PROJECT_STRUCTURE.md', content: generateProjectStructure() },
        { name: '.env.example', content: 'VITE_ELEVENLABS_API_KEY=your_api_key_here\n' }
      ];

      // Create and download files
      files.forEach(file => {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });

      setExportStatus('success');
    } catch (error) {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
      <div className="flex items-center mb-6">
        <Github className="h-8 w-8 text-gray-800 mr-3" />
        <div>
          <h3 className="text-2xl font-bold text-gray-900">GitHub Integration</h3>
          <p className="text-gray-600">Prepare your project for hackathon submission</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Repository Setup */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">🚀 Repository Setup</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">1. Create Repository</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Create a new public repository on GitHub for your hackathon submission.
                </p>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Create New Repository
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">2. Repository URL</h5>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/ai-health-assistant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-800 mb-2">3. Git Commands</h5>
                <div className="bg-black text-green-400 p-3 rounded text-xs font-mono space-y-1">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m "Initial commit: AI Health Assistant"</div>
                  <div>git branch -M main</div>
                  <div>git remote add origin {repoUrl || '[YOUR_REPO_URL]'}</div>
                  <div>git push -u origin main</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Export */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">📚 Documentation Export</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Export Project Files</h5>
                <p className="text-sm text-blue-700 mb-4">
                  Download README, project structure, and configuration files for your repository.
                </p>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isExporting ? (
                    <>
                      <Upload className="h-4 w-4 animate-spin" />
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Export Documentation</span>
                    </>
                  )}
                </button>
              </div>

              {/* Export Status */}
              {exportStatus === 'success' && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-700 text-sm">Documentation exported successfully!</span>
                </div>
              )}

              {exportStatus === 'error' && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-red-700 text-sm">Export failed. Please try again.</span>
                </div>
              )}

              {/* Hackathon Checklist */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-3">🏆 Hackathon Checklist</h5>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    Repository created and public
                  </label>
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    README.md with project description
                  </label>
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    Live demo deployed
                  </label>
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    Video demonstration recorded
                  </label>
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    ElevenLabs API configured
                  </label>
                  <label className="flex items-center text-purple-700">
                    <input type="checkbox" className="mr-2" />
                    Sample data included
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🎯 Technical Highlights for Judges</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">React 18</div>
            <div className="text-sm text-gray-600">Modern Frontend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">D3.js v7.8</div>
            <div className="text-sm text-gray-600">Advanced Visualizations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">ElevenLabs AI</div>
            <div className="text-sm text-gray-600">Voice Narration</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubIntegration;