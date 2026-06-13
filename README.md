# 💪 Fitness Quest - Gamified Workout App

A free, open-source fitness app inspired by Arise that gamifies your workout journey. Level up, complete quests, earn achievements, and build sustainable fitness habits.

## 🎮 Features

- **Gamified Workouts** - Complete daily quests and earn XP to level up
- **Custom Workout Plans** - AI-powered personalized routines based on your profile
- **Achievement System** - Earn badges and unlock milestones
- **Streak Tracking** - Build consistency with daily workout streaks
- **Social Guild System** - Join guilds, compete with friends, share progress
- **Progress Analytics** - Track stats, charts, and workout history
- **Nutrition Tracking** - Log calories and macros
- **100% Free & Open Source** - No paywalls, no premium tiers

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **MongoDB** - Database for users, workouts, progress
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend (Web)
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Chart.js** - Data visualization

### Mobile (React Native)
- **React Native** - iOS/Android app
- **React Navigation** - Navigation
- **Redux** - State management
- **Expo** - Build and deployment

## 📁 Project Structure

```
fitness-quest/
├── backend/              # Node.js + Express API
├── web/                  # React web app
├── mobile/               # React Native mobile app
├── shared/               # Shared types and utilities
└── docs/                 # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Web Setup
```bash
cd web
npm install
npm start
```

### Mobile Setup
```bash
cd mobile
npm install
expo start
```

## 📚 API Documentation

See [API_DOCS.md](./docs/API_DOCS.md) for detailed endpoint documentation.

## 🎯 Core Concepts

### Level System
- Level 1-100 progression
- 1000 XP per level
- XP earned from workouts, streaks, achievements

### Workout Types
- Strength Training (push, pull, legs)
- Cardio
- Flexibility
- Sports

### Quest System
- Daily quests (3 per day)
- Weekly challenges
- Seasonal events
- Tier-based difficulty

### Guilds
- Create or join guilds
- Guild battles and competitions
- Shared leaderboards
- Guild achievements

## 📖 Documentation

- [API Documentation](./docs/API_DOCS.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [User Guide](./docs/USER_GUIDE.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 📝 License

MIT License - see [LICENSE](./LICENSE)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 💬 Community

- [Discord Server](https://discord.gg/fitness-quest)
- [GitHub Issues](https://github.com/sreeragkv00/fitness-quest/issues)
- [Discussions](https://github.com/sreeragkv00/fitness-quest/discussions)

## 🎬 Getting Help

- Check the [FAQ](./docs/FAQ.md)
- Read [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
- Open an issue on GitHub

---

**Built with ❤️ for the fitness community**