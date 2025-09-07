require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
// Trust reverse proxy (needed for Render/Heroku/Netlify, etc.)
app.set("trust proxy", 1);


app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true on Render
      sameSite: "none", // allow cross-site
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

//  CORS
app.use(
  cors({
    origin: ["https://klickks-auth.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);

// Test root
app.get("/", (req, res) => res.send("API running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
