🚀 Task Management Dashboard — Full Stack Application
📌 Project Overview

This is a full-stack task management dashboard built using:

React (Frontend)

Node.js + Express (Backend)

MongoDB (Database)

JWT Authentication

REST APIs

The application allows users to register, login, and manage their tasks through a modern dashboard interface with analytics, filters, and dynamic updates.

✨ Features
🔐 Authentication

User Registration

User Login

JWT-based authentication

Protected backend routes

Secure password hashing using bcrypt

📋 Task Management (CRUD)

Users can:

Create tasks

Edit tasks

Delete tasks

Mark tasks as completed

Assign deadlines

Assign categories

📊 Dashboard Analytics

Total tasks overview

Completed vs pending statistics

Task category distribution (charts)

Weekly completion trends

Dynamic updates from backend data

🔎 Advanced UI Features

Search tasks by title

Filter by category

Status badges (Completed / Pending / Delayed)

Expandable inline editing

Responsive modern UI

🧱 Tech Stack
Frontend

React

React Router

Tailwind CSS

Recharts (for charts)

Axios (API requests)

Vite

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcryptjs

📁 Project Structure
Project_07/
│
├── project_07/ (Frontend)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── package.json
│
├── backend/
│   ├── config/db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── package.json
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-link>
cd Project_07
2️⃣ Backend Setup

Navigate to backend folder:

cd backend
npm install
Create Environment Variables

Create .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start Backend Server
npm run dev

Expected output:

Server running on port 5000
MongoDB Connected
3️⃣ Frontend Setup

Open new terminal:

cd project_07
npm install
Start Frontend
npm run dev

Open browser:

http://localhost:5173
🔑 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Tasks

Protected routes (require JWT token):

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
🧪 Testing Flow

Register a new user

Login

Create tasks

Edit tasks

Delete tasks

Refresh page — data persists via MongoDB



🚀 Future Improvements

Drag & drop Kanban board

Real-time updates

User profile customization

Notifications system

👩‍💻 Author

Khushi Pandit
