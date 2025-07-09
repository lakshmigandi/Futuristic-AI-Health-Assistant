import React from 'react';
import { BookOpen, TrendingUp, Users, Heart, Activity, AlertTriangle } from 'lucide-react';
import { HealthMetrics, DataInsight } from '../types/health';

interface DataStoryTellingProps {
  metrics: HealthMetrics;
  insights: DataInsight[];
}

/**
 * DataStoryTelling Component
 * 
 * Creates a narrative-driven presentation of health data insights
 * with visual storytelling elements and key findings.
 */
const DataStoryTelling: React.FC<DataStoryTellingProps> = ({ metrics, insights }) => {
  // Generate story chapters based on data
  const generateStoryChapters = () => {
    const chapters = [
      {
        title: "The Health Landscape",
        icon: Users,
        content: `Our analysis reveals patterns from ${metrics.totalRecords.toLocaleString()} health records, painting a comprehensive picture of community health. With an average heart rate of ${metrics.averageHeartRate} bpm and daily step counts averaging ${metrics.averageStepCount.toLocaleString()}, we can identify both opportunities and challenges in public health.`,
        highlight: `${metrics.totalRecords.toLocaleString()} Records Analyzed`,
        color: "blue"
      },
      {
        title: "The Activity Story",
        icon: Activity,
        content: `Physical activity patterns reveal a concerning trend in our Kaggle dataset. Step count shows a clear inverse relationship with age - younger adults average significantly more daily steps than older demographics. This decline in physical activity with aging correlates with increased health risks and emphasizes the importance of maintaining active lifestyles throughout life.`,
        highlight: "Step Count Decreases with Age",
        color: "green"
      },
      {
        title: "The Heart Rate Connection",
        icon: TrendingUp,
        content: `Our analysis reveals a positive correlation between age and heart rate. As individuals age, their average resting heart rate tends to increase, indicating cardiovascular changes over time. This trend, combined with decreased physical activity, creates a compound effect on overall health outcomes and highlights the need for age-specific cardiovascular monitoring.`,
        highlight: "Heart Rate Increases with Age",
        color: "orange"
      },
      {
        title: "The Glucose Connection",
        icon: Heart,
        content: `Glucose levels tell a compelling story about metabolic health. With ${metrics.averageGlucose} mg/dL average glucose levels and a ${metrics.diabetesRate}% diabetes rate, we see clear opportunities for targeted health interventions and lifestyle modifications.`,
        highlight: `${metrics.diabetesRate}% Diabetes Rate`,
        color: "red"
      },
      {
        title: "The Path Forward",
        icon: AlertTriangle,
        content: `These insights point toward actionable health strategies: increased physical activity programs, age-specific screening protocols, and glucose monitoring initiatives. Data-driven healthcare decisions can significantly improve community health outcomes.`,
        highlight: "Evidence-Based Solutions",
        color: "purple"
      }
    ];

    return chapters;
  };

  const chapters = generateStoryChapters();

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      red: "bg-red-50 border-red-200 text-red-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8">
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Health Data Story</h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Discover the narrative hidden within the numbers. Our AI analysis transforms raw health data 
          into meaningful insights that tell the story of community wellness, risk factors, and opportunities for improvement.
        </p>
      </div>

      {/* Story Chapters */}
      <div className="p-8">
        <div className="space-y-8">
          {chapters.map((chapter, index) => (
            <div key={index} className="relative">
              {/* Chapter Number */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                
                {/* Chapter Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <chapter.icon className="h-6 w-6 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">{chapter.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {chapter.content}
                      </p>
                    </div>
                    
                    <div className={`p-6 rounded-xl border-2 ${getColorClasses(chapter.color)}`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-2">{chapter.highlight}</div>
                        <div className="text-sm opacity-75">Key Finding</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < chapters.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-indigo-300 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights Summary */}
      <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Executive Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.slice(0, 6).map((insight, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">{insight.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.trend === 'positive' ? 'bg-green-100 text-green-800' :
                  insight.trend === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {insight.trend}
                </span>
              </div>
              <div className="text-lg font-bold text-indigo-600 mb-1">{insight.value}</div>
              <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataStoryTelling;