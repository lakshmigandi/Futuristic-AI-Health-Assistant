# 🏆 Hackathon Setup Guide

## Quick Setup for Judges and Reviewers

### 1. Clone and Install (2 minutes)
```bash
git clone [YOUR_REPO_URL]
cd ai-health-assistant
npm install
```

### 2. Environment Setup (1 minute)
```bash
# Copy environment template
cp .env.example .env

# Add your ElevenLabs API key (optional for basic demo)
echo "VITE_ELEVENLABS_API_KEY=your_key_here" >> .env
```

### 3. Start Application (30 seconds)
```bash
npm run dev
```

## 🎯 Demo Flow for Judges

### Step 1: Default Data Visualization
- Application loads with sample health dataset (500 records)
- Observe interactive D3.js visualizations:
  - Bar chart showing heart rate by age group
  - Line chart displaying step count trends
  - Scatter plot revealing diabetes risk factors

### Step 2: Voice Narration (Requires API Key)
- Click "Play Insights" button in the Voice Narrator section
- Listen to AI-generated health insights explanation
- Demonstrates ElevenLabs integration and accessibility features

### Step 3: Data Upload Testing
- Use the "Load Health Data" section
- Upload a CSV file or fetch from GitHub URL
- Watch real-time data processing and visualization updates

### Step 4: Interactive Features
- Hover over chart elements for detailed tooltips
- Explore the data storytelling narrative
- Review AI-generated insights and recommendations

## 🔧 ElevenLabs API Setup (Optional)

### For Full Demo Experience:
1. Visit [ElevenLabs.io](https://elevenlabs.io)
2. Sign up for free account
3. Copy API key from dashboard
4. Add to `.env` file: `VITE_ELEVENLABS_API_KEY=your_key`
5. Restart development server

### Without API Key:
- All visualizations work perfectly
- Voice narration shows setup instructions
- Full functionality except audio synthesis

## 📊 Sample Data for Testing

### CSV Format Example:
```csv
age,heartRate,stepCount,glucoseLevel,hasDiabetes,gender
25,72,8500,85,false,female
45,78,6200,110,false,male
60,82,4500,145,true,female
35,70,9200,90,false,male
55,85,5800,130,true,female
```

### GitHub Test URLs:
- Use any public CSV file with health data
- Application auto-maps common column names
- Validates data types and ranges

## 🎨 Key Features to Highlight

### Technical Innovation:
- **React 18** with modern hooks and TypeScript
- **D3.js v7.8** for advanced data visualizations
- **ElevenLabs AI** for voice synthesis
- **Tailwind CSS** for responsive design

### Healthcare Impact:
- **Risk Assessment**: Diabetes and cardiovascular analysis
- **Population Health**: Community health trends
- **Accessibility**: Voice narration for inclusive design
- **Clinical Insights**: Evidence-based recommendations

### User Experience:
- **Interactive Tooltips**: Detailed data on hover
- **Smooth Animations**: Professional chart transitions
- **Mobile Responsive**: Works on all devices
- **Real-time Processing**: Dynamic data analysis

## 🚀 Production Deployment

### Quick Deploy Options:

#### Vercel (Recommended):
```bash
npm install -g vercel
vercel --prod
```

#### Netlify:
```bash
npm run build
# Upload dist/ folder to Netlify
```

#### GitHub Pages:
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 🏅 Judging Criteria Alignment

### Innovation (25%):
- ✅ AI voice narration in healthcare
- ✅ Real-time data processing
- ✅ Interactive storytelling approach

### Technical Implementation (25%):
- ✅ Modern React architecture
- ✅ Advanced D3.js visualizations
- ✅ TypeScript for type safety
- ✅ API integration (ElevenLabs)

### User Experience (25%):
- ✅ Intuitive interface design
- ✅ Accessibility features
- ✅ Mobile responsiveness
- ✅ Interactive feedback

### Healthcare Impact (25%):
- ✅ Diabetes risk assessment
- ✅ Population health insights
- ✅ Clinical decision support
- ✅ Evidence-based recommendations

## 📞 Support for Judges

### Common Issues:
1. **Voice not working**: Check API key in .env file
2. **Charts not loading**: Ensure modern browser (Chrome/Firefox)
3. **CSV upload fails**: Check file format and column names
4. **Mobile issues**: Test on latest mobile browsers

### Contact Information:
- **GitHub Issues**: [Repository issues page]
- **Demo Video**: [Link to video demonstration]
- **Live Demo**: [Deployed application URL]

---

**Thank you for reviewing our AI Personal Health Assistant! 🏥✨**