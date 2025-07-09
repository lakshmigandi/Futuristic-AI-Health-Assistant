export interface HealthRecord {
  id: string;
  age: number;
  heartRate: number;
  stepCount: number;
  glucoseLevel: number;
  hasDiabetes: boolean;
  gender: 'male' | 'female';
  timestamp: Date;
}

export interface AgeGroup {
  ageRange: string;
  averageHeartRate: number;
  count: number;
  minAge: number;
  maxAge: number;
  averageStepCount?: number;
}

export interface HealthMetrics {
  totalRecords: number;
  averageHeartRate: number;
  averageStepCount: number;
  averageGlucose: number;
  diabetesRate: number;
}

export interface StepTrend {
  date: Date;
  averageSteps: number;
  count: number;
}

export interface DataInsight {
  title: string;
  description: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
}