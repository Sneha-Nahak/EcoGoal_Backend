const mongoose = require('mongoose');

const HabitLogSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  completed: Boolean,
  notes: String
});

HabitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HabitLog', HabitLogSchema);
