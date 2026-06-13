const express = require('express');
const { authenticate } = require('../middleware/auth');
const NutritionLog = require('../models/NutritionLog');

const router = express.Router();

// Log meal
router.post('/log', authenticate, async (req, res) => {
  try {
    const { food, calories, protein, carbs, fat, mealType } = req.body;
    
    if (!food || !calories) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Food and calories required' }
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let log = await NutritionLog.findOne({
      userId: req.userId,
      date: { $gte: today }
    });
    
    if (!log) {
      log = new NutritionLog({ userId: req.userId });
    }
    
    log.entries.push({
      food,
      calories,
      protein,
      carbs,
      fat,
      mealType: mealType || 'snack'
    });
    
    await log.save();
    
    res.status(201).json({
      success: true,
      data: log
    });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get nutrition logs
router.get('/logs', authenticate, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const logs = await NutritionLog.find(query).sort({ date: -1 });
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get daily summary
router.get('/daily-summary', authenticate, async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    date.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const log = await NutritionLog.findOne({
      userId: req.userId,
      date: { $gte: date, $lt: tomorrow }
    });
    
    if (!log) {
      return res.json({
        success: true,
        data: {
          date,
          entries: [],
          totals: { calories: 0, protein: 0, carbs: 0, fat: 0 }
        }
      });
    }
    
    res.json({ success: true, data: log });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
