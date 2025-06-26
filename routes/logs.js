const router = require('express').Router();
const HabitLog = require('../models/HabitLog');
const Streak = require('../models/Streak');
const auth = require('../middleware/auth');
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);


// --- GET /logs ---

router.get('/', auth, async (req, res) => {
  try {
    const { habitId } = req.query;
    if (!habitId) return res.status(400).json({ error: 'habitId is required' });

    const logs = await HabitLog.find({ habitId, userId: req.user._id });
    res.json(logs);
  } catch (err) {
    console.error('Error in GET /logs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- POST /logs ---
router.post('/', auth, async (req, res) => {
  try {
    const { habitId, date, completed, notes } = req.body;

    if (!habitId || !date || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const logDate = dayjs(date).startOf('day');

    const log = await HabitLog.findOneAndUpdate(
      { habitId, date },
      {
        $set: {
          userId: req.user._id,
          habitId,
          date,
          completed,
          notes
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true, new: true }
    );

    let streak = await Streak.findOne({ habitId, userId: req.user._id });

    if (!streak) {
      await Streak.create({
        habitId,
        userId: req.user._id,
        currentStreak: 1,
        longestStreak: 1,
        lastTrackedDate: logDate.toDate()
      });
    } else {
      const lastDate = dayjs(streak.lastTrackedDate).startOf('day');
      const isConsecutive = lastDate.isSame(logDate.subtract(1, 'day'), 'day');

      streak.currentStreak = isConsecutive ? streak.currentStreak + 1 : 1;
      streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
      streak.lastTrackedDate = logDate.toDate();
      await streak.save();
    }

    res.json(log);
  } catch (err) {
    console.error('Error in POST /logs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- GET /logs/summary ---
router.get('/summary', auth, async (req, res) => {
  try {
    const { habitId } = req.query;
    if (!habitId) return res.status(400).json({ error: 'habitId is required' });

    const logs = await HabitLog.find({ habitId, userId: req.user._id });

    const summary = {
      yearly: {},
      monthly: {},
      weekly: {}
    };

    logs.forEach(log => {
      if (!log.completed) return;

      const date = dayjs(log.date);
      const yearKey = date.format('YYYY');
      const monthKey = date.format('YYYY-MM');
      const weekKey = `${date.format('YYYY')}-W${date.isoWeek().toString().padStart(2, '0')}`;

      summary.yearly[yearKey] = (summary.yearly[yearKey] || 0) + 1;
      summary.monthly[monthKey] = (summary.monthly[monthKey] || 0) + 1;
      summary.weekly[weekKey] = (summary.weekly[weekKey] || 0) + 1;
    });

    res.json(summary);
  } catch (err) {
    console.error('Error in GET /summary:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- GET /logs/streak ---
router.get('/streak', auth, async (req, res) => {
  try {
    const { habitId } = req.query;
    if (!habitId) return res.status(400).json({ error: 'habitId is required' });

    const streak = await Streak.findOne({ habitId, userId: req.user._id });

    res.json({
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0
    });
  } catch (err) {
    console.error('Error in GET /streak:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;