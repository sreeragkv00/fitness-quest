const express = require('express');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');
const Achievement = require('../models/Achievement');

const router = express.Router();

// Get all achievements with unlock status
router.get('/', authenticate, async (req, res) => {
  try {
    const achievements = await Achievement.find();
    const user = await User.findById(req.userId);
    
    const achievementsWithStatus = achievements.map(achievement => ({
      ...achievement.toObject(),
      unlocked: user.achievements.includes(achievement._id)
    }));
    
    res.json({ success: true, data: achievementsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get user's unlocked achievements
router.get('/user/unlocked', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('achievements');
    res.json({ success: true, data: user.achievements });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
