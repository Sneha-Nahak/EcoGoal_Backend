require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

const corsOptions = {
  origin: 'https://eco-goal-platform.vercel.app',
  credentials: true,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/habits', require('./routes/habits'))
app.use('/api/logs', require('./routes/logs'))
app.use('/api/contact', require('./routes/contact'))

app.get('/', (req, res) => {
  res.send('The backend is running successfully')
})

app.use('*', (req, res) => {
  res.redirect('/')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running locally on http://localhost:${PORT}`))
}
