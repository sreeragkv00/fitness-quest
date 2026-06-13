const mongoose = require('mongoose');

const nutritionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  entries: [{
    food: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    protein: Number, // grams
    carbs: Number,   // grams
    fat: Number,     // grams
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      default: 'snack'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  totals: {
    calories: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update totals when entries are added
nutritionLogSchema.pre('save', function(next) {
  this.totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };
  
  this.entries.forEach(entry => {
    this.totals.calories += entry.calories || 0;
    this.totals.protein += entry.protein || 0;
    this.totals.carbs += entry.carbs || 0;
    this.totals.fat += entry.fat || 0;
  });
  
  next();
});

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
