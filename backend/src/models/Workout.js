const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'sports', 'other'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  duration: {
    type: Number,
    required: true // minutes
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    distance: Number,
    notes: String
  }],
  intensity: {
    type: String,
    enum: ['light', 'moderate', 'intense'],
    default: 'moderate'
  },
  notes: String,
  xpEarned: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: true
  },
  questId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate XP based on duration and intensity
workoutSchema.pre('save', function(next) {
  if (!this.xpEarned) {
    const baseXP = Math.floor(this.duration / 10);
    const intensityMultiplier = {
      'light': 1,
      'moderate': 1.5,
      'intense': 2
    }[this.intensity] || 1;
    
    this.xpEarned = Math.floor(baseXP * intensityMultiplier) + 50;
  }
  next();
});

module.exports = mongoose.model('Workout', workoutSchema);
