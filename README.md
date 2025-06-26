# 🌿 EcoGoals Backend - Habit Management Tracker API

This is the backend server for the **EcoGoals Habit Management Tracker** — an eco-conscious habit tracking web app that helps users develop sustainable routines through habit logging, visual progress, and streak management.

The backend provides RESTful APIs for authentication, habit tracking, activity logging, streak calculations, and user support. Built with Express.js and MongoDB, this backend supports features like token-based route protection, date utilities using `dayjs`, and data endpoints compatible with visual tools like `chart.js`.

---

## 🌐 Base URL
```
http://localhost:5000
```

## 📁 Folder Structure
```
EcoGoal_Backend/
├── middleware/
│ └── auth.js # JWT middleware to protect private routes
├── models/ # MongoDB schemas (User, Habit, Log)
├── routes/ # All route handlers
│ ├── auth.js # User login & registration
│ ├── contact.js # Contact form (optional)
│ ├── habits.js # Habit management routes
│ └── logs.js # Logs & streaks for tracking progress
├── .env # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── server.js # Server entry point

```
## ⚙️ Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Utilities**:
  - `dayjs`: Lightweight date library for log timestamps and streak tracking
  - `chart.js` (used on frontend): Visualizes data provided by this backend (e.g., progress, habit frequency)

---

## 📌 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT token-based session management
- Middleware to protect habit/log routes

### 🌱 Habit Management
- Add new eco-friendly habits
- Update or remove existing habits
- Toggle status: active/inactive
- All operations scoped to authenticated users

### 📊 Logs, Streaks & Insights
- Log habit completion per day
- Calculate daily streaks and activity ratios
- Generate data consumed by `chart.js` for user visual feedback

### 📬 Contact Support 
- Send messages or feedback via contact route

---

## 🧪 API Endpoints

### 🔑 Auth Routes (`/api/auth`)
| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | /register              | Register a new user              |
| POST   | /login                 | Login and receive JWT token      |
| POST   | /forgot-password       | provide email to get reset link  |
| POST   | /reset-password/:token | provide new passowrd             |

### 🌿 Habit Routes (`/api/habits`)
| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| POST   | /            | Create a new habit                 |
| GET    | /            | Get all habits for logged-in user |


### 📈 Log Routes (`/api/logs`)
| Method | Endpoint       | Description                           |
|--------|----------------|---------------------------------------|
| POST   | /              | Log a habit as completed              |
| GET    | /              | Fetch all logs for a user             |
| GET    | /streaks       | Retrieve current streak statistics    |

### 📬 Contact Routes (`/api/contact`)
| Method | Endpoint     | Description             |
|--------|--------------|-------------------------|
| POST   | /            | Submit a contact message|

---

## 📦 Dependencies

Key packages used in this backend:

```json
"dependencies": {
  "express": "^4.x",
  "mongoose": "^7.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "dotenv": "^16.x",
  "cors": "^2.x",
  "dayjs": "^1.x"
}
```
### 📈 Chart & Date Utilities
## 📅 dayjs
Used to:

Calculate log dates and streak continuity

Format timestamps for streak checking

Compare habit activity across dates

## 📊 chart.js (on frontend)
Backend provides habit frequency and activity breakdown logs

Consumed by frontend to render:

Bar/line graphs for habit trends

## 🛠️ Setup Instructions
# 1. Clone and Navigate
```bash
git clone https://github.com/your-username/EcoGoal_Backend.git
cd EcoGoal_Backend
```
# 2. Install Dependencies
```bash
npm install
```
# 3. Add .env
```env
PORT=5000
MONGO_URL=mongodb+srv://<your-mongo-url>
JWT_SECRET=your_jwt_secret
```
# 4. Start Server
```bash
Copy code
node server.js
```
# 🚀 Deployment Notes
You can deploy this backend to:

Render

Railway

Heroku

Cyclic.sh

Make sure to:

Add environment variables securely in the dashboard

Allow CORS for your frontend domain

## 👤 Author
Sneha Nahak
