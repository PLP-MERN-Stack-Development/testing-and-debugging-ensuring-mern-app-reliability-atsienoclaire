MERN Bug Tracker

A simple bug tracking system built using the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication.
Users must log in to create, view, or delete bugs.

🚀 Features

User authentication (Login + JWT)

Add new bugs

View list of bugs

Delete bugs

Error boundary for React crashes

Fully functional Express API

React frontend with token storage in localStorage

CORS enabled backend

📁 Project Structure
/client
  ├── src
  │    ├── App.jsx
  │    ├── main.jsx
  │    ├── components
  │    │      ├── Login.jsx
  │    │      └── ErrorBoundary.jsx
  │    ├── pages
  │    │      └── BugList.jsx
  │    └── ...
/server
  ├── server.js
  ├── routes
  │      └── authRoutes.js
  ├── controllers
  │      └── authController.js
  ├── models
  │      └── User.js
  ├── .env
  └── ...

🛠️ Tech Stack
Frontend

React (Vite)

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JSON Web Tokens (JWT)

CORS

⚙️ Environment Variables

Create a server/.env file:

MONGO_URI=your_mongo_database_url
JWT_SECRET=your_secret_key
PORT=5000

▶️ How to Run the Project
1. Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Install backend dependencies
cd server
npm install

3. Start backend
npm start


Backend runs at:

http://localhost:5000

4. Install frontend dependencies

Open another terminal:

cd client
npm install

5. Start frontend
npm run dev


Frontend runs at something like:

http://localhost:5173

📝 API Routes
Auth
Method	Endpoint	Description
POST	/api/auth/login	User login
Bugs
Method	Endpoint	Description
GET	/api/bugs	Get all bugs
POST	/api/bugs	Create a bug
DELETE	/api/bugs/:id	Delete a bug
🔐 Authentication Flow

User logs in

Server returns JWT token

Frontend stores token in localStorage

Token is included in requests automatically

Logging out removes the token

📌 Future Improvements

Registration page

Admin roles

Bug priority levels

Comments on bugs

Email notifications