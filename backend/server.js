require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: ["https://klickks-auth.vercel.app", "http://localhost:5173"], // frontend URLs
    credentials: true, // allow cookies
  })
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,           // because Render uses HTTPS
      sameSite: "none",       // allow cross-site (vercel → render)
      maxAge: 1000 * 60 * 60 * 24
    }
    ,
  })
);


// Routes
app.use("/auth", authRoutes);

// Test root
app.get("/", (req, res) => res.send("API running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
