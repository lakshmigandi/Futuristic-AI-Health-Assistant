# 🔗 Git & StackBlitz Integration Guide

## 🚀 Step-by-Step Setup

### 1. Create GitHub Repository

1. **Go to GitHub**: [github.com/new](https://github.com/new)
2. **Repository name**: `ai-health-assistant`
3. **Description**: `AI-powered health data visualization with voice narration`
4. **Make it Public** (required for StackBlitz integration)
5. **Don't initialize** with README (we already have one)
6. **Click "Create repository"**

### 2. Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "🏥 Initial commit: AI Health Assistant with ElevenLabs integration"

# Add your GitHub repository as origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-health-assistant.git

# Create and switch to main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. StackBlitz Integration Options

#### Option A: Direct Import
1. Go to [stackblitz.com](https://stackblitz.com)
2. Click **"Import from GitHub"**
3. Enter your repository URL: `https://github.com/YOUR_USERNAME/ai-health-assistant`
4. StackBlitz will automatically import and run your project

#### Option B: Direct URL
Share this link for instant StackBlitz access:
```
https://stackblitz.com/github/YOUR_USERNAME/ai-health-assistant
```

#### Option C: Embed in Website
```html
<iframe src="https://stackblitz.com/github/YOUR_USERNAME/ai-health-assistant?embed=1&file=src/App.tsx" width="100%" height="600"></iframe>
```

### 4. Environment Variables Setup

#### For StackBlitz:
1. Open your project in StackBlitz
2. Create `.env` file in the root
3. Add your API key:
```
VITE_ELEVENLABS_API_KEY=sk_67b3c0d7a8a5d0f1548d4c94ce4517cc5a21fdb9f3c1cbba
```

#### For Local Development:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
echo "VITE_ELEVENLABS_API_KEY=sk_67b3c0d7a8a5d0f1548d4c94ce4517cc5a21fdb9f3c1cbba" >> .env
```

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub for automatic deployments
```

### GitHub Pages
```bash
# Build and deploy to GitHub Pages
npm run build
npm run deploy
```

## 🔧 StackBlitz Features

Your project will have these features in StackBlitz:
- ✅ **Instant Preview**: Live preview with hot reloading
- ✅ **Code Editor**: Full VS Code experience in browser
- ✅ **Terminal Access**: Run npm commands directly
- ✅ **File Management**: Upload/download files
- ✅ **Sharing**: Share live demos with judges/reviewers
- ✅ **Embedding**: Embed in presentations or websites

## 📱 Mobile Testing

Test your app on mobile devices:
- **StackBlitz Mobile**: Works on tablets and phones
- **GitHub Codespaces**: Full development environment
- **Local Network**: `npm run dev -- --host` for local mobile testing

## 🎯 Hackathon Benefits

### For Judges:
- **Instant Access**: No setup required, just click the StackBlitz link
- **Live Demo**: Real-time interaction with your app
- **Code Review**: Browse source code directly in browser
- **Mobile Testing**: Test responsive design on any device

### For You:
- **Easy Sharing**: One link for demo and code
- **Version Control**: Git integration for collaboration
- **Backup**: Code safely stored on GitHub
- **Deployment**: Multiple hosting options available

## 🔗 Important Links Template

After setup, you'll have these links:
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/ai-health-assistant`
- **StackBlitz Demo**: `https://stackblitz.com/github/YOUR_USERNAME/ai-health-assistant`
- **Live Deployment**: `https://your-app.vercel.app`

## 🚨 Troubleshooting

### Common Issues:
1. **API Key Not Working**: Make sure it's in `.env` file and restart dev server
2. **StackBlitz Import Failed**: Ensure repository is public
3. **Build Errors**: Check all dependencies are installed
4. **Voice Not Working**: Verify ElevenLabs API key is correct

### Quick Fixes:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset git if needed
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ai-health-assistant.git
```

---

**🎉 Your AI Health Assistant is ready for Git and StackBlitz integration!**

Follow these steps and you'll have a professional, shareable demo ready for your hackathon submission.