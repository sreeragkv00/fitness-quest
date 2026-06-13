# Setup Guide - Fitness Quest

## Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** - For cloning the repository
- **npm** or **yarn** - Package manager

## Quick Start (All Platforms)

### 1. Clone Repository

```bash
git clone https://github.com/sreeragkv00/fitness-quest.git
cd fitness-quest
```

## Backend Setup

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and update:
```
MONGODB_URI=mongodb://localhost:27017/fitness-quest
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-quest?retryWrites=true&w=majority
```

### 4. Start MongoDB (Local)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Use MongoDB Compass or start the service
```

### 5. Run Backend

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Fitness Quest API running on port 5000
```

## Web App Setup

### 1. Open New Terminal, Navigate to Web

```bash
cd web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app should be available at `http://localhost:5173`

## Mobile App Setup

### 1. Open New Terminal, Navigate to Mobile

```bash
cd mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Expo Development Server

```bash
npm start
```

### 4. Run on Device

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Physical Device:**
- Install Expo Go from App Store or Google Play
- Scan the QR code from the terminal

## Testing the App

### 1. Create Account

- Go to http://localhost:5173 (or mobile app)
- Click "Sign Up"
- Fill in details:
  - Username: `testuser`
  - Email: `test@example.com`
  - Password: `password123`

### 2. Login

- Use the credentials you just created

### 3. View Dashboard

- You should see your level, streak, and daily quests
- Try logging a workout

### 4. API Testing

Use **Postman** or **curl**:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas: Verify whitelist IP in Network Access

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Update `CORS_ORIGIN` in backend `.env`
- For local: `CORS_ORIGIN=http://localhost:5173,http://localhost:3000`

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Database Setup

### Create Seed Data (Optional)

```bash
# From backend directory
node scripts/seed.js
```

### View Database

**MongoDB Compass:**
- Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
- Connect to `mongodb://localhost:27017`
- Browse collections

**MongoDB Atlas:**
- Login to [Atlas Dashboard](https://cloud.mongodb.com)
- View collections in Collections tab

## Development Workflow

### Recommended Terminal Setup

**Terminal 1 - Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 - Web:**
```bash
cd web && npm run dev
```

**Terminal 3 - Mobile:**
```bash
cd mobile && npm start
```

### File Structure

```
fitness-quest/
├── backend/
│   ├── src/
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth, validation
│   │   └── server.js      # Entry point
│   ├── .env.example
│   └── package.json
│
├── web/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # Reusable components
│   │   ├── redux/         # State management
│   │   ├── api/           # API client
│   │   └── App.jsx
│   └── package.json
│
├── mobile/
│   ├── src/
│   │   ├── screens/       # Mobile screens
│   │   ├── redux/         # State management
│   │   ├── api/           # API client
│   │   ├── navigation/    # React Navigation
│   │   └── App.jsx
│   ├── app.json           # Expo config
│   └── package.json
│
└── docs/                  # Documentation
```

## Next Steps

1. ✅ Explore the dashboard
2. ✅ Log a workout
3. ✅ Complete daily quests
4. ✅ Create a guild
5. ✅ Check the leaderboard

## Need Help?

- Check [API Documentation](./docs/API_DOCS.md)
- Read [User Guide](./docs/USER_GUIDE.md)
- Open an [Issue](https://github.com/sreeragkv00/fitness-quest/issues)
- Join [Discussions](https://github.com/sreeragkv00/fitness-quest/discussions)

---

**Happy coding! 🚀**
