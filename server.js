require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI);

app.use(cors({
  origin: 'https://eco-goal-platform.vercel.app',
  credentials: true
}));

app.use(express.json());
app.options(/.*/, cors());

app.get('/', (req, res) => {
  res.send('server is running successfully');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/habits', require('./routes/habits'));
app.use('/api/logs', require('./routes/logs'));
app.use("/api/contact", require('./routes/contact'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
