import React from 'react';
import { Database, ExternalLink, Trophy, BarChart3, Users } from 'lucide-react';

/**
 * KaggleDatasetInfo Component
 * 
 * Displays information about the Kaggle dataset used in this Global Hack Week submission
 */
const KaggleDatasetInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl shadow-2xl border border-orange-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-500 rounded-full">
            <Database className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Kaggle Dataset Information</h2>
            <p className="text-orange-700 text-lg">Global Hack Week - Data Storytelling Challenge</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full">
          <Trophy className="h-5 w-5" />
          <span className="font-semibold">Hackathon Entry</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dataset Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 text-orange-600 mr-2" />
              Dataset Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Dataset Name:</span>
                <span className="text-gray-900 font-semibold">Synthetic Health Data for AI Dashboard</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">File Format:</span>
                <span className="text-gray-900 font-semibold">health_data.csv</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Columns:</span>
                <span className="text-gray-900 font-semibold">age, heart_rate, step_count, diabetes_risk</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Purpose:</span>
                <span className="text-gray-900 font-semibold">AI Health Analytics & Visualization</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-orange-600 mr-2" />
              Data Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Health Records</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4</div>
                <div className="text-sm text-gray-600">Key Metrics</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">20-80</div>
                <div className="text-sm text-gray-600">Age Range</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">Synthetic</div>
                <div className="text-sm text-gray-600">Data Type</div>
              </div>
            </div>
          </div>
        </div>

        {/* Links and Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Dataset Links</h3>
            <div className="space-y-4">
              <a
                href="https://www.kaggle.com/datasets/lakshmigandi/synthetic-health-data-for-ai-dashboard/data"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Database className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">View on Kaggle</div>
                    <div className="text-sm text-orange-100">Access the complete dataset</div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/lakshmigandi/Future-Health-AI-App"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <div className="font-semibold">GitHub Repository</div>
                    <div className="text-sm text-gray-300">View source code and data</div>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Hackathon Challenge</h3>
            <p className="text-purple-100 leading-relaxed">
              This project demonstrates advanced data storytelling techniques using synthetic health data. 
              The visualization combines D3.js charts, AI-powered insights, and voice narration to create 
              an engaging narrative about health trends and patterns.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-purple-200">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">Kaggle Global Hack Week 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaggleDatasetInfo;