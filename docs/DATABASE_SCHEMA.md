# Database Schema - Fitness Quest

## Collections Overview

### Users
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String (URL),
    bio: String,
    birthDate: Date,
    gender: String (M/F/Other),
    height: Number (cm),
    weight: Number (kg)
  },
  fitness: {
    level: Number (1-100, default: 1),
    currentXP: Number (default: 0),
    totalXP: Number (default: 0),
    streak: Number (days, default: 0),
    lastWorkoutDate: Date,
    totalWorkouts: Number (default: 0),
    totalMinutes: Number (default: 0)
  },
  preferences: {
    fitnessLevel: String (beginner/intermediate/advanced),
    workoutTypes: [String],
    equipment: [String],
    availableMinutesPerDay: Number,
    daysPerWeek: Number
  },
  guildId: ObjectId (reference to Guild),
  achievements: [ObjectId] (references to Achievement),
  createdAt: Date,
  updatedAt: Date
}
```

### Workouts
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  date: Date,
  type: String (strength/cardio/flexibility/sports),
  name: String,
  description: String,
  duration: Number (minutes),
  caloriesBurned: Number,
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
      duration: Number,
      notes: String
    }
  ],
  intensity: String (light/moderate/intense),
  notes: String,
  xpEarned: Number,
  completed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Quests
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String,
  description: String,
  type: String (daily/weekly/seasonal),
  difficulty: String (easy/medium/hard),
  objective: {
    type: String (minutes/calories/exercises/strength),
    target: Number
  },
  reward: {
    xp: Number,
    gold: Number
  },
  progress: Number (current),
  completed: Boolean (default: false),
  completedAt: Date,
  expiresAt: Date,
  createdAt: Date
}
```

### Achievements
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String (URL),
  category: String (level/streak/workout/social),
  requirement: {
    type: String,
    value: Number
  },
  xpReward: Number,
  rarity: String (common/uncommon/rare/legendary),
  createdAt: Date
}
```

### Guilds
```javascript
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  leader: ObjectId (reference to User),
  members: [ObjectId] (references to Users),
  maxMembers: Number (default: 50),
  level: Number (1-10, default: 1),
  totalXP: Number (default: 0),
  logo: String (URL),
  banner: String (URL),
  stats: {
    totalWorkouts: Number,
    totalMinutes: Number,
    averageLevel: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### NutritionLogs
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  date: Date,
  entries: [
    {
      food: String,
      calories: Number,
      protein: Number (g),
      carbs: Number (g),
      fat: Number (g),
      mealType: String (breakfast/lunch/dinner/snack),
      timestamp: Date
    }
  ],
  totals: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  createdAt: Date
}
```

### Leaderboard
```javascript
{
  _id: ObjectId,
  type: String (global/guild/weekly),
  period: String (all-time/weekly/monthly),
  entries: [
    {
      userId: ObjectId,
      username: String,
      rank: Number,
      value: Number (XP, workouts, etc.),
      updatedAt: Date
    }
  ],
  updatedAt: Date
}
```

## Indexes

```javascript
// Users
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ "fitness.level": -1 })

// Workouts
db.workouts.createIndex({ userId: 1, date: -1 })
db.workouts.createIndex({ type: 1 })

// Quests
db.quests.createIndex({ userId: 1, completed: 1 })
db.quests.createIndex({ expiresAt: 1 })

// Guilds
db.guilds.createIndex({ name: 1 }, { unique: true })
db.guilds.createIndex({ leader: 1 })

// NutritionLogs
db.nutritionlogs.createIndex({ userId: 1, date: -1 })
```