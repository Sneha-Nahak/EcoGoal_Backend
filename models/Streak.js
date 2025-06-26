const mongoose = require('mongoose');

const StreakSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastTrackedDate: Date
});

module.exports = mongoose.model('Streak', StreakSchema);
