const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    birthDate: Date,
    gender: String,
    height: Number, // cm
    weight: Number  // kg
  },
  fitness: {
    level: {
      type: Number,
      default: 1,
      min: 1,
      max: 100
    },
    currentXP: {
      type: Number,
      default: 0
    },
    totalXP: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    lastWorkoutDate: Date,
    totalWorkouts: {
      type: Number,
      default: 0
    },
    totalMinutes: {
      type: Number,
      default: 0
    },
    totalCalories: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    workoutTypes: [String],
    equipment: [String],
    availableMinutesPerDay: Number,
    daysPerWeek: Number,
    notifications: {
      type: Boolean,
      default: true
    }
  },
  guildId: mongoose.Schema.Types.ObjectId,
  achievements: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to add XP
userSchema.methods.addXP = function(xp) {
  this.fitness.currentXP += xp;
  this.fitness.totalXP += xp;
  
  // Check for level up (1000 XP per level)
  const newLevel = Math.floor(this.fitness.totalXP / 1000) + 1;
  if (newLevel > this.fitness.level && newLevel <= 100) {
    this.fitness.level = newLevel;
    return { levelUp: true, newLevel };
  }
  return { levelUp: false };
};

// Method to update streak
userSchema.methods.updateStreak = function() {
  const today = new Date().toDateString();
  const lastWorkout = this.fitness.lastWorkoutDate?.toDateString();
  
  if (lastWorkout === today) return; // Already worked out today
  
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (lastWorkout === yesterday) {
    this.fitness.streak += 1;
    if (this.fitness.streak > this.fitness.longestStreak) {
      this.fitness.longestStreak = this.fitness.streak;
    }
  } else {
    this.fitness.streak = 1; // Reset streak
  }
  
  this.fitness.lastWorkoutDate = new Date();
};

module.exports = mongoose.model('User', userSchema);
