import React from 'react';
import { TrendingUp, TrendingDown, Minus, Brain, Heart, Activity } from 'lucide-react';
import { DataInsight } from '../types/health';

interface DataInsightsProps {
  insights: DataInsight[];
}

const DataInsights: React.FC<DataInsightsProps> = ({ insights }) => {
  const getTrendIcon = (trend: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'positive' | 'negative' | 'neutral') => {
    switch (trend) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'negative':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-purple-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">AI-Generated Data Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${getTrendColor(insight.trend)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                {insight.title}
              </h4>
              {getTrendIcon(insight.trend)}
            </div>
            
            <div className="mb-3">
              <span className="text-2xl font-bold text-gray-900">{insight.value}</span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional AI Analysis Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
        <div className="flex items-center mb-4">
          <Heart className="h-5 w-5 text-purple-600 mr-2" />
          <h4 className="font-semibold text-purple-800">Health Pattern Analysis</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h5 className="font-medium text-purple-700">Risk Correlations</h5>
            <ul className="space-y-1 text-purple-600">
              <li>• Age strongly correlates with diabetes risk</li>
              <li>• Higher glucose levels in 50+ age group</li>
              <li>• Heart rate variability increases with age</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-purple-700">Activity Patterns</h5>
            <ul className="space-y-1 text-purple-600">
              <li>• Step count peaks in 30-40 age group</li>
              <li>• Weekend activity shows 15% decrease</li>
              <li>• Consistent daily patterns observed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInsights;