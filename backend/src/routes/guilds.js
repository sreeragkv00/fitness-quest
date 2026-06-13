const express = require('express');
const { authenticate } = require('../middleware/auth');
const Guild = require('../models/Guild');
const User = require('../models/User');

const router = express.Router();

// Create guild
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, logo } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_NAME', message: 'Guild name required' }
      });
    }
    
    const guild = new Guild({
      name,
      description,
      logo,
      leader: req.userId,
      members: [req.userId]
    });
    
    await guild.save();
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { guildId: guild._id },
      { new: true }
    );
    
    res.status(201).json({ success: true, data: guild });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get guild
router.get('/:guildId', async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId)
      .populate('leader members', 'username profile');
    
    if (!guild) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Guild not found' }
      });
    }
    
    res.json({ success: true, data: guild });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get user's guild
router.get('/my-guild', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.guildId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NO_GUILD', message: 'User not in a guild' }
      });
    }
    
    const guild = await Guild.findById(user.guildId)
      .populate('leader members', 'username profile fitness');
    
    res.json({ success: true, data: guild });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Join guild
router.post('/:guildId/join', authenticate, async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Guild not found' }
      });
    }
    
    if (guild.members.includes(req.userId)) {
      return res.status(400).json({
        success: false,
        error: { code: 'ALREADY_MEMBER', message: 'Already a member' }
      });
    }
    
    if (guild.members.length >= guild.maxMembers) {
      return res.status(400).json({
        success: false,
        error: { code: 'GUILD_FULL', message: 'Guild is full' }
      });
    }
    
    guild.members.push(req.userId);
    await guild.save();
    
    await User.findByIdAndUpdate(req.userId, { guildId: guild._id });
    
    res.json({ success: true, message: 'Joined guild' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Leave guild
router.post('/:guildId/leave', authenticate, async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId);
    if (!guild) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Guild not found' }
      });
    }
    
    if (guild.leader.toString() === req.userId) {
      return res.status(400).json({
        success: false,
        error: { code: 'LEADER_CANNOT_LEAVE', message: 'Leader cannot leave guild' }
      });
    }
    
    guild.members = guild.members.filter(id => id.toString() !== req.userId);
    await guild.save();
    
    await User.findByIdAndUpdate(req.userId, { guildId: null });
    
    res.json({ success: true, message: 'Left guild' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get guild leaderboard
router.get('/:guildId/leaderboard', async (req, res) => {
  try {
    const guild = await Guild.findById(req.params.guildId)
      .populate('members', 'username profile fitness');
    
    if (!guild) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Guild not found' }
      });
    }
    
    const leaderboard = guild.members
      .map(member => ({
        username: member.username,
        level: member.fitness.level,
        totalXP: member.fitness.totalXP
      }))
      .sort((a, b) => b.totalXP - a.totalXP)
      .map((member, index) => ({ ...member, rank: index + 1 }));
    
    res.json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
