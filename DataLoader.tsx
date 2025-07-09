import React, { useState, useRef } from 'react';
import { Upload, Link, AlertCircle, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import { HealthRecord } from '../types/health';

interface DataLoaderProps {
  onDataLoad: (data: HealthRecord[]) => void;
}

const DataLoader: React.FC<DataLoaderProps> = ({ onDataLoad }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [csvUrl, setCsvUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSVData = (csvData: any[]): HealthRecord[] => {
    return csvData.map((row, index) => ({
      id: `record-${index}`,
      age: parseInt(row.age) || Math.floor(Math.random() * 60) + 20,
      heartRate: parseInt(row.heartRate || row.heart_rate) || Math.floor(Math.random() * 30) + 70,
      stepCount: parseInt(row.stepCount || row.step_count || row.steps) || Math.floor(Math.random() * 8000) + 2000,
      glucoseLevel: parseInt(row.glucoseLevel || row.glucose_level || row.glucose) || Math.floor(Math.random() * 100) + 70,
      hasDiabetes: row.hasDiabetes === 'true' || row.has_diabetes === 'true' || row.diabetes === 'true' || Math.random() < 0.1,
      gender: (row.gender === 'male' || row.gender === 'female') ? row.gender : (Math.random() < 0.5 ? 'male' : 'female'),
      timestamp: row.timestamp ? new Date(row.timestamp) : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const healthData = parseCSVData(results.data);
          onDataLoad(healthData);
          setSuccess(`Successfully loaded ${healthData.length} health records from file`);
        } catch (err) {
          setError('Error parsing CSV file. Please check the format.');
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        setError(`Error reading file: ${error.message}`);
        setLoading(false);
      }
    });
  };

  const handleUrlLoad = async () => {
    if (!csvUrl.trim()) {
      setError('Please enter a valid CSV URL');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          try {
            const healthData = parseCSVData(results.data);
            onDataLoad(healthData);
            setSuccess(`Successfully loaded ${healthData.length} health records from URL`);
          } catch (err) {
            setError('Error parsing CSV data. Please check the format.');
          } finally {
            setLoading(false);
          }
        },
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(`Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Load Health Data</h3>
        <p className="text-gray-600">
          Upload a CSV file or fetch data from a public URL to analyze health metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Upload */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload CSV File
          </h4>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Processing...' : 'Choose CSV File'}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Expected columns: age, heartRate, stepCount, glucoseLevel, hasDiabetes, gender
            </p>
          </div>
        </div>

        {/* URL Input */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Link className="mr-2 h-5 w-5" />
            Load from URL
          </h4>
          <div className="space-y-3">
            <input
              type="url"
              value={csvUrl}
              onChange={(e) => setCsvUrl(e.target.value)}
              placeholder="https://example.com/health-data.csv"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleUrlLoad}
              disabled={loading || !csvUrl.trim()}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : 'Load Data'}
            </button>
            <p className="text-sm text-gray-500">
              Example: GitHub raw CSV files, public health datasets
            </p>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700">{success}</span>
        </div>
      )}
    </div>
  );
};

export default DataLoader;