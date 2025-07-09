import { HealthRecord, AgeGroup, HealthMetrics, StepTrend, DataInsight } from '../types/health';

export const processHealthData = (data: HealthRecord[]): {
  ageGroups: AgeGroup[];
  metrics: HealthMetrics;
  stepTrends: StepTrend[];
  insights: DataInsight[];
  stepCountByAge: AgeGroup[];
} => {
  // Create age groups
  const ageRanges = [
    { range: '20-29', min: 20, max: 29 },
    { range: '30-39', min: 30, max: 39 },
    { range: '40-49', min: 40, max: 49 },
    { range: '50-59', min: 50, max: 59 },
    { range: '60-69', min: 60, max: 69 },
    { range: '70+', min: 70, max: 100 }
  ];

  const ageGroups: AgeGroup[] = ageRanges.map(({ range, min, max }) => {
    const recordsInRange = data.filter(record => 
      record.age >= min && record.age <= max
    );
    
    const averageHeartRate = recordsInRange.length > 0
      ? recordsInRange.reduce((sum, record) => sum + record.heartRate, 0) / recordsInRange.length
      : 0;

    const averageStepCount = recordsInRange.length > 0
      ? recordsInRange.reduce((sum, record) => sum + record.stepCount, 0) / recordsInRange.length
      : 0;

    return {
      ageRange: range,
      averageHeartRate: Math.round(averageHeartRate * 10) / 10,
      count: recordsInRange.length,
      minAge: min,
      maxAge: max,
      averageStepCount: Math.round(averageStepCount)
    };
  }).filter(group => group.count > 0);

  // Calculate overall metrics
  const totalRecords = data.length;
  const averageHeartRate = data.reduce((sum, record) => sum + record.heartRate, 0) / totalRecords;
  const averageStepCount = data.reduce((sum, record) => sum + record.stepCount, 0) / totalRecords;
  const averageGlucose = data.reduce((sum, record) => sum + record.glucoseLevel, 0) / totalRecords;
  const diabetesCount = data.filter(record => record.hasDiabetes).length;
  const diabetesRate = (diabetesCount / totalRecords) * 100;

  const metrics: HealthMetrics = {
    totalRecords,
    averageHeartRate: Math.round(averageHeartRate * 10) / 10,
    averageStepCount: Math.round(averageStepCount),
    averageGlucose: Math.round(averageGlucose * 10) / 10,
    diabetesRate: Math.round(diabetesRate * 10) / 10
  };

  // Process step trends over time
  const stepTrends = processStepTrends(data);
  
  // Generate AI insights
  const insights = generateInsights(data, metrics);

  // Step count by age for the new line chart
  const stepCountByAge = ageGroups.map(group => ({
    ...group,
    averageStepCount: group.averageStepCount || 0
  }));

  return { ageGroups, metrics, stepTrends, insights, stepCountByAge };
};

const processStepTrends = (data: HealthRecord[]): StepTrend[] => {
  // Group data by date
  const dateGroups = data.reduce((acc, record) => {
    const dateKey = record.timestamp.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(record);
    return acc;
  }, {} as Record<string, HealthRecord[]>);

  // Calculate average steps per day
  const trends = Object.entries(dateGroups)
    .map(([dateStr, records]) => ({
      date: new Date(dateStr),
      averageSteps: Math.round(records.reduce((sum, r) => sum + r.stepCount, 0) / records.length),
      count: records.length
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return trends;
};

const generateInsights = (data: HealthRecord[], metrics: HealthMetrics): DataInsight[] => {
  const insights: DataInsight[] = [];

  // Heart rate and age correlation insight
  const youngAdults = data.filter(r => r.age < 40);
  const olderAdults = data.filter(r => r.age >= 50);
  const youngAvgHeartRate = youngAdults.reduce((sum, r) => sum + r.heartRate, 0) / youngAdults.length;
  const olderAvgHeartRate = olderAdults.reduce((sum, r) => sum + r.heartRate, 0) / olderAdults.length;
  const heartRateIncrease = ((olderAvgHeartRate - youngAvgHeartRate) / youngAvgHeartRate) * 100;
  
  insights.push({
    title: 'Heart Rate vs Age Trend',
    value: `+${heartRateIncrease.toFixed(1)}%`,
    description: `Heart rate increases by ${heartRateIncrease.toFixed(1)}% from young adults (<40) to older adults (50+), showing cardiovascular changes with aging.`,
    trend: 'negative'
  });

  // Step count and age correlation insight
  const youngAvgSteps = youngAdults.reduce((sum, r) => sum + r.stepCount, 0) / youngAdults.length;
  const olderAvgSteps = olderAdults.reduce((sum, r) => sum + r.stepCount, 0) / olderAdults.length;
  const stepCountDecrease = ((youngAvgSteps - olderAvgSteps) / youngAvgSteps) * 100;
  
  insights.push({
    title: 'Step Count vs Age Trend',
    value: `-${stepCountDecrease.toFixed(1)}%`,
    description: `Daily step count decreases by ${stepCountDecrease.toFixed(1)}% from young to older adults, indicating reduced physical activity with age.`,
    trend: 'negative'
  });

  // Age-related diabetes insight
  const olderDiabetesRate = (olderAdults.filter(r => r.hasDiabetes).length / olderAdults.length) * 100;
  
  insights.push({
    title: 'Age Risk Factor',
    value: `${olderDiabetesRate.toFixed(1)}%`,
    description: 'Diabetes rate in adults 50+ is significantly higher than younger demographics, indicating age as a key risk factor.',
    trend: olderDiabetesRate > 15 ? 'negative' : 'neutral'
  });

  // Activity level insight
  const highActivityThreshold = 8000;
  const activeUsers = data.filter(r => r.stepCount >= highActivityThreshold).length;
  const activityRate = (activeUsers / data.length) * 100;
  
  insights.push({
    title: 'Activity Level',
    value: `${activityRate.toFixed(1)}%`,
    description: `${activityRate.toFixed(1)}% of users meet the recommended daily step count of ${highActivityThreshold.toLocaleString()} steps.`,
    trend: activityRate > 50 ? 'positive' : 'negative'
  });

  // Heart rate variability insight
  const heartRateStd = Math.sqrt(
    data.reduce((sum, r) => sum + Math.pow(r.heartRate - metrics.averageHeartRate, 2), 0) / data.length
  );
  
  insights.push({
    title: 'Heart Rate Variability',
    value: `±${heartRateStd.toFixed(1)} bpm`,
    description: 'Heart rate variability indicates cardiovascular health. Lower variability may suggest better fitness.',
    trend: heartRateStd < 15 ? 'positive' : 'neutral'
  });

  // Glucose level insight
  const highGlucose = data.filter(r => r.glucoseLevel > 140).length;
  const preDiabeticRate = (highGlucose / data.length) * 100;
  
  insights.push({
    title: 'Glucose Levels',
    value: `${preDiabeticRate.toFixed(1)}%`,
    description: 'Percentage of individuals with elevated glucose levels (>140 mg/dL), indicating pre-diabetic or diabetic conditions.',
    trend: preDiabeticRate > 20 ? 'negative' : 'positive'
  });

  // Gender-based insight
  const maleData = data.filter(r => r.gender === 'male');
  const femaleData = data.filter(r => r.gender === 'female');
  const maleDiabetesRate = (maleData.filter(r => r.hasDiabetes).length / maleData.length) * 100;
  const femaleDiabetesRate = (femaleData.filter(r => r.hasDiabetes).length / femaleData.length) * 100;
  
  insights.push({
    title: 'Gender Distribution',
    value: `${Math.abs(maleDiabetesRate - femaleDiabetesRate).toFixed(1)}%`,
    description: `Diabetes rate difference between genders. ${maleDiabetesRate > femaleDiabetesRate ? 'Males' : 'Females'} show higher prevalence.`,
    trend: 'neutral'
  });

  // Step count trend insight
  const recentData = data.filter(r => {
    const daysDiff = (Date.now() - r.timestamp.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  });
  
  const recentAvgSteps = recentData.reduce((sum, r) => sum + r.stepCount, 0) / recentData.length;
  const stepTrend = recentAvgSteps > metrics.averageStepCount ? 'positive' : 'negative';
  
  insights.push({
    title: 'Recent Activity Trend',
    value: `${Math.abs(recentAvgSteps - metrics.averageStepCount).toFixed(0)}`,
    description: `Recent 7-day average shows ${stepTrend === 'positive' ? 'increased' : 'decreased'} activity compared to overall average.`,
    trend: stepTrend
  });

  return insights;
};