const express = require('express');
const { authenticate } = require('../middleware/auth');
const Quest = require('../models/Quest');
const User = require('../models/User');

const router = express.Router();

// Get daily quests
router.get('/daily', authenticate, async (req, res) => {
  try {
    const now = new Date();
    let quests = await Quest.find({
      userId: req.userId,
      type: 'daily',
      expiresAt: { $gte: now },
      completed: false
    });
    
    if (quests.length === 0) {
      quests = await Quest.generateDailyQuests(req.userId);
    }
    
    res.json({ success: true, data: quests });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get all quests
router.get('/', authenticate, async (req, res) => {
  try {
    const { type, completed } = req.query;
    const query = { userId: req.userId };
    
    if (type) query.type = type;
    if (completed !== undefined) query.completed = completed === 'true';
    
    const quests = await Quest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: quests });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Complete quest
router.post('/:questId/complete', authenticate, async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.questId);
    if (!quest || quest.userId.toString() !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quest not found' }
      });
    }
    
    quest.completed = true;
    quest.completedAt = new Date();
    await quest.save();
    
    const user = await User.findById(req.userId);
    const levelUp = user.addXP(quest.reward.xp);
    await user.save();
    
    res.json({
      success: true,
      data: {
        quest,
        xpEarned: quest.reward.xp,
        levelUp: levelUp.levelUp,
        newLevel: levelUp.newLevel
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Skip quest
router.post('/:questId/skip', authenticate, async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.questId);
    if (!quest || quest.userId.toString() !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quest not found' }
      });
    }
    
    await Quest.findByIdAndDelete(req.params.questId);
    res.json({ success: true, message: 'Quest skipped' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
