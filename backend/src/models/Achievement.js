const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  category: {
    type: String,
    enum: ['level', 'streak', 'workout', 'social', 'nutrition'],
    default: 'workout'
  },
  requirement: {
    type: String,
    enum: ['level', 'streak', 'total_workouts', 'guild_member', 'calories'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  xpReward: {
    type: Number,
    default: 100
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'legendary'],
    default: 'common'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Achievement', achievementSchema);
