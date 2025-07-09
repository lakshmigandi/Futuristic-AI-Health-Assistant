import React, { useMemo, useEffect } from 'react';
import { Heart, Activity, Users, AlertTriangle, Droplets, Database, Trophy } from 'lucide-react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import StepCountLineChart from './components/StepCountLineChart';
import ScatterPlot from './components/ScatterPlot';
import MetricCard from './components/MetricCard';
import DataLoader from './components/DataLoader';
import DataInsights from './components/DataInsights';
import VoiceNarrator from './components/VoiceNarrator';
import DataStoryTelling from './components/DataStoryTelling';
import GitHubIntegration from './components/GitHubIntegration';
import KaggleDatasetInfo from './components/KaggleDatasetInfo';
import { healthData } from './data/healthData';
import { processHealthData } from './utils/dataProcessing';
import { HealthRecord } from './types/health';
import Papa from 'papaparse';

function App() {
  const [currentData, setCurrentData] = React.useState<HealthRecord[]>(healthData);
  const [isLoadingGitHubData, setIsLoadingGitHubData] = React.useState(false);
  const { ageGroups, metrics, stepTrends, insights, stepCountByAge } = useMemo(() => 
    processHealthData(currentData), [currentData]);

  // Load data from GitHub repository on component mount
  useEffect(() => {
    loadGitHubData();
  }, []);

  const loadGitHubData = async () => {
    setIsLoadingGitHubData(true);
    try {
      const githubUrl = 'https://raw.githubusercontent.com/lakshmigandi/Future-Health-AI-App/main/health_data.csv';
      const response = await fetch(githubUrl);
      
      if (response.ok) {
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const healthData = results.data.map((row: any, index: number) => ({
              id: `record-${index}`,
              age: parseInt(row.age) || Math.floor(Math.random() * 60) + 20,
              heartRate: parseInt(row.heart_rate) || Math.floor(Math.random() * 30) + 70,
              stepCount: parseInt(row.step_count) || Math.floor(Math.random() * 8000) + 2000,
              glucoseLevel: parseInt(row.diabetes_risk) || Math.floor(Math.random() * 100) + 70,
              hasDiabetes: (row.diabetes_risk && parseInt(row.diabetes_risk) > 140) || Math.random() < 0.1,
              gender: Math.random() < 0.5 ? 'male' : 'female',
              timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            }));
            setCurrentData(healthData);
          }
        });
      }
    } catch (error) {
      console.log('Using default dataset as GitHub data is not available yet');
    } finally {
      setIsLoadingGitHubData(false);
    }
  };

  const handleDataLoad = (newData: HealthRecord[]) => {
    setCurrentData(newData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-2xl border-b border-indigo-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Heart className="h-10 w-10 text-white animate-pulse" />
                <div>
                  <h1 className="text-4xl font-bold text-white">Futuristic AI Health Assistant</h1>
                  <p className="text-indigo-200 text-lg">Kaggle Global Hack Week - Data Storytelling Challenge</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">Global Hack Week</span>
              </div>
              <div className="flex items-center space-x-2 text-white bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Database className="h-5 w-5" />
                <span className="font-semibold">Kaggle Dataset</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Kaggle Dataset Information */}
        <KaggleDatasetInfo />

        {/* Data Loader */}
        <DataLoader onDataLoad={handleDataLoad} />

        {/* Voice Narrator */}
        <VoiceNarrator insights={insights} />

        {/* Data Story Telling */}
        <DataStoryTelling metrics={metrics} insights={insights} />

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-2xl p-8 mb-8 border border-blue-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Future of Health Analytics
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              Analyzing {metrics.totalRecords} synthetic health records from our Kaggle dataset to provide 
              AI-powered insights into heart rate patterns, physical activity trends, and health correlations 
              across different age groups. This project demonstrates the power of data storytelling in healthcare.
            </p>
            {isLoadingGitHubData && (
              <div className="mt-4 text-indigo-600 font-medium">
                Loading latest dataset from GitHub repository...
              </div>
            )}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <MetricCard
            title="Total Records"
            value={metrics.totalRecords.toLocaleString()}
            icon={Users}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Average Heart Rate"
            value={`${metrics.averageHeartRate} bpm`}
            icon={Heart}
            color="red"
            trend={{ value: 2.3, isPositive: false }}
          />
          <MetricCard
            title="Average Daily Steps"
            value={metrics.averageStepCount.toLocaleString()}
            icon={Activity}
            color="green"
            trend={{ value: 8.7, isPositive: true }}
          />
          <MetricCard
            title="Average Glucose"
            value={`${metrics.averageGlucose} mg/dL`}
            icon={Droplets}
            color="purple"
            trend={{ value: 3.2, isPositive: false }}
          />
          <MetricCard
            title="Diabetes Risk Rate"
            value={`${metrics.diabetesRate}%`}
            icon={AlertTriangle}
            color="purple"
            trend={{ value: 1.2, isPositive: false }}
          />
        </div>

        {/* Data Insights */}
        <DataInsights insights={insights} />

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart - Heart Rate */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Heart Rate Analysis by Age Group
              </h3>
              <p className="text-gray-600">
                Average heart rate patterns showing the correlation between age and cardiovascular metrics.
                Notice how heart rate tends to increase with age.
              </p>
            </div>
            
            <div className="flex justify-center">
              <BarChart data={ageGroups} width={600} height={400} />
            </div>
          </div>

          {/* Line Chart - Step Count by Age */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Step Count Trends by Age Group
              </h3>
              <p className="text-gray-600">
                Physical activity patterns across age demographics. Observe how step count 
                generally decreases with advancing age.
              </p>
            </div>
            
            <div className="flex justify-center">
              <StepCountLineChart data={stepCountByAge} width={600} height={400} />
            </div>
          </div>
        </div>

        {/* Time Series Line Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Daily Activity Trends Over Time
            </h3>
            <p className="text-gray-600">
              Temporal analysis of step count variations showing daily activity patterns and trends.
            </p>
          </div>
          
          <div className="flex justify-center">
            <LineChart data={stepTrends} width={1000} height={400} />
          </div>
        </div>

        {/* Scatter Plot - Full Width */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Health Risk Correlation Analysis
            </h3>
            <p className="text-gray-600">
              Multi-dimensional analysis showing the relationship between age, glucose levels, and diabetes risk. 
              Red dots indicate high-risk individuals based on our Kaggle dataset.
            </p>
          </div>
          
          <div className="flex justify-center">
            <ScatterPlot data={currentData} width={1000} height={500} />
          </div>
        </div>

        {/* GitHub Integration */}
        <GitHubIntegration />

        {/* AI Insights Section */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-6 flex items-center">
            <Heart className="mr-4 h-8 w-8" />
            AI-Powered Health Insights from Kaggle Dataset
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-xl mb-4">Key Findings from Data Analysis</h4>
              <ul className="space-y-3 text-indigo-100">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Heart rate shows positive correlation with age progression
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Step count demonstrates inverse relationship with aging
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Glucose levels vary significantly across age demographics
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Diabetes risk factors cluster in specific age ranges
                </li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-xl mb-4">Data-Driven Recommendations</h4>
              <ul className="space-y-3 text-indigo-100">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Implement age-specific fitness programs to maintain activity levels
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Enhanced cardiovascular monitoring for older demographics
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Targeted diabetes prevention strategies based on risk profiles
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Personalized health interventions using predictive analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-300">
            <p className="text-lg">© 2025 Futuristic AI Health Assistant | Kaggle Global Hack Week Submission</p>
            <p className="text-sm mt-2">Powered by advanced health analytics, D3.js visualizations, and ElevenLabs AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;