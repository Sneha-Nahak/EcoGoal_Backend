const router = require('express').Router();
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

//Post habits of logged in user
router.post('/', auth, async (req, res) => {
  const habit = new Habit({ ...req.body, userId: req.user._id });
  await habit.save();
  res.json(habit);
});


//Get habits of logged in user
router.get('/', auth, async (req, res) => {
  const habits = await Habit.find({ userId: req.user._id });
  res.json(habits);
});

module.exports = router;
