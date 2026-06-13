const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Quest = require('../models/Quest');

const router = express.Router();

// Create workout
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, type, duration, exercises, intensity, notes } = req.body;
    
    const user = await User.findById(req.userId);
    
    const workout = new Workout({
      userId: req.userId,
      name,
      type,
      duration,
      exercises,
      intensity,
      notes
    });
    
    // Calculate calories (rough estimate: 5-10 cal per minute depending on intensity)
    const calMultiplier = { light: 5, moderate: 7, intense: 10 }[intensity] || 7;
    workout.caloriesBurned = workout.duration * calMultiplier;
    
    await workout.save();
    
    // Add XP and update user stats
    const levelUp = user.addXP(workout.xpEarned);
    user.fitness.totalWorkouts += 1;
    user.fitness.totalMinutes += duration;
    user.fitness.totalCalories += workout.caloriesBurned;
    user.updateStreak();
    
    await user.save();
    
    res.status(201).json({
      success: true,
      data: {
        workout,
        xpEarned: workout.xpEarned,
        levelUp: levelUp.levelUp,
        newLevel: levelUp.newLevel
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get user workouts
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;
    const query = { userId: req.userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (type) query.type = type;
    
    const workouts = await Workout.find(query).sort({ date: -1 });
    res.json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get workout by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || workout.userId.toString() !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Workout not found' }
      });
    }
    
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Update workout
router.put('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || workout.userId.toString() !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Workout not found' }
      });
    }
    
    Object.assign(workout, req.body);
    await workout.save();
    
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Delete workout
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || workout.userId.toString() !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Workout not found' }
      });
    }
    
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
