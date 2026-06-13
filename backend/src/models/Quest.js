const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['daily', 'weekly', 'seasonal', 'challenge'],
    default: 'daily'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  objective: {
    type: {
      type: String,
      enum: ['minutes', 'calories', 'exercises', 'strength', 'distance']
    },
    target: Number
  },
  progress: {
    type: Number,
    default: 0
  },
  reward: {
    xp: {
      type: Number,
      default: 100
    },
    gold: {
      type: Number,
      default: 0
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to generate daily quests
questSchema.statics.generateDailyQuests = async function(userId) {
  const difficulties = ['easy', 'medium', 'hard'];
  const quests = [];
  
  const questTemplates = [
    { title: 'Morning Energy', objective: { type: 'minutes', target: 30 } },
    { title: 'Cardio Burst', objective: { type: 'minutes', target: 45 } },
    { title: 'Iron Grind', objective: { type: 'minutes', target: 60 } }
  ];
  
  for (let i = 0; i < 3; i++) {
    const template = questTemplates[i];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);
    
    const quest = new this({
      userId,
      title: template.title,
      type: 'daily',
      difficulty: difficulties[i],
      objective: template.objective,
      reward: {
        xp: (i + 1) * 100
      },
      expiresAt: tomorrow
    });
    
    quests.push(quest);
  }
  
  return await this.insertMany(quests);
};

module.exports = mongoose.model('Quest', questSchema);
