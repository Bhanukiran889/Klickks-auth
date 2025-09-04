# React + Node.js Authentication (SQLite)

A simple **Login / Logout flow** built with **Vite + React (frontend)** and **Node.js + Express + SQLite (backend)**.  
Uses **bcrypt** for password hashing and **express-session** with cookies for authentication.

---

## Features
- User Registration (email + password)
- Login with sessions (cookie-based auth)
- Protected Dashboard route
- Logout & clear session
- SQLite database (lightweight, file-based)
- Styled with **Tailwind CSS v4**

---

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, SQLite3, bcrypt, express-session, cookie-parser, cors


---

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
node server.js
```
Backend runs on http://localhost:5000

## 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---
## Environment Variables

Create a .```env``` file inside ```frontend```/:
---

```bash
VITE_BACKEND_URL=http://xyz.render.com/auth
```


## Endpoints
* ```POST /auth/register``` → Register new user
* ```POST /auth/login``` → Login user
* ```GET /auth/dashboard``` → Get user info (protected)
* ```POST /auth/logout```→ Logout user


## Database
* SQLite database file users.db created automatically in backend.
* Contains a single table users (id, email, password).