import { HealthRecord } from '../types/health';

// Generate sample health data similar to Kaggle datasets
export const generateHealthData = (): HealthRecord[] => {
  const records: HealthRecord[] = [];
  
  // Generate 500 sample records with realistic health data
  for (let i = 0; i < 500; i++) {
    const age = Math.floor(Math.random() * 60) + 20; // Age between 20-80
    const baseHeartRate = age > 60 ? 75 : age > 40 ? 70 : 68;
    const heartRate = Math.floor(Math.random() * 30) + baseHeartRate; // Realistic heart rate
    const stepCount = Math.floor(Math.random() * 8000) + 2000; // 2000-10000 steps
    const glucoseLevel = Math.floor(Math.random() * 100) + 70; // 70-170 mg/dL
    const hasDiabetes = Math.random() < (age > 50 ? 0.15 : 0.05); // Higher diabetes rate for older people
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    
    // Generate timestamp over the last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - daysAgo);
    
    records.push({
      id: `record-${i}`,
      age,
      heartRate,
      stepCount,
      glucoseLevel,
      hasDiabetes,
      gender,
      timestamp
    });
  }
  
  return records;
};

export const healthData = generateHealthData();