require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: 'https://eco-goal-platform.vercel.app',
  credentials: true
}));

app.use(express.json());
app.options(/.*/, cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
  res.send('The backend is running successfully');
});

app.use('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running locally on http://localhost:${PORT}`)
  );
}
