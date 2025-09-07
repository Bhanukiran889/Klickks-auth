// server.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");

const app = express();

// Allowed origins (from .env or fallback)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prevents JS access to cookies
      secure: process.env.NODE_ENV === "production", // only true with HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Routes
app.use("/auth", authRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
