A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, edit, delete, and collaborate on notes in real time using Socket.IO. Built with Redux Toolkit, React Router, and styled using Tailwind CSS.

Live Demo
Frontend: https://your-frontend.vercel.app
Backend: https://your-backend.onrender.com

Features
Create, edit, and delete notes

Real-time collaboration with active user count

Socket.IO-powered instant syncing between users

View and filter all notes (All, Recent, Old)

Toast notifications for user feedback

Redux store for global state management

🖌 Tailwind CSS for responsive UI

Tech Stack
Frontend:
React 19

Redux Toolkit

React Router DOM v7

Socket.IO Client

Tailwind CSS v4

React Toastify

Axios

Backend:
Node.js

Express

MongoDB with Mongoose

Socket.IO

dotenv

CORS

Project Structure
java
Copy
Edit
├── client/ → React frontend (Vite)
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── App.jsx
│ ├── main.jsx
│ └── ...
├── server/ → Node.js backend (Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── socket/
│ ├── server.js
│ └── ...

🛠️ Installation & Setup

1. Clone the repository
   bash
   Copy
   Edit
   git clone
   cd realtime-notes-app
2. Setup the backend
   bash
   Copy
   Edit
   cd backend
   npm install

# Add .env file with MONGO_URI and PORT

npm run dev 3. Setup the frontend
bash
Copy
Edit
cd frontend
npm install

# Add .env file with VITE_API_URL and VITE_SOCKET_URL

npm run dev

🌐 Deployment
Frontend deployed on Vercel

Backend deployed on Render
