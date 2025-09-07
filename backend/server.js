const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth")

const app = express();

//  Allow both local dev + vercel frontend
const allowedOrigins = [
  "http://localhost:3000", // dev
  "https://klickks-auth.vercel.app", // vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/CLI
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, //  allow cookies/auth
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Session middleware (important for auth persistence)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod (HTTPS only)
      sameSite: "none", //  required for cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Auth routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
