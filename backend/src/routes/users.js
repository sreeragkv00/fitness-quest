const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const Workout = require('../models/Workout');

const router = express.Router();

// Get user profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('guildId achievements');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Update user profile
router.put('/me', authenticate, async (req, res) => {
  try {
    const { profile, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profile, preferences, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get user statistics
router.get('/me/stats', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const workouts = await Workout.find({ userId: req.userId, completed: true });
    
    const stats = {
      level: user.fitness.level,
      currentXP: user.fitness.currentXP,
      totalXP: user.fitness.totalXP,
      streak: user.fitness.streak,
      longestStreak: user.fitness.longestStreak,
      totalWorkouts: workouts.length,
      totalMinutes: workouts.reduce((sum, w) => sum + w.duration, 0),
      totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
      lastWorkoutDate: user.fitness.lastWorkoutDate
    };
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get global leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    
    const users = await User.find()
      .select('username profile fitness')
      .sort({ 'fitness.totalXP': -1 })
      .limit(limit)
      .skip(offset);
    
    const leaderboard = users.map((user, index) => ({
      rank: offset + index + 1,
      username: user.username,
      avatar: user.profile.avatar,
      level: user.fitness.level,
      totalXP: user.fitness.totalXP
    }));
    
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
