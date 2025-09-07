const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// ✅ Allow both local dev + vercel frontend
const allowedOrigins = [
  "http://localhost:3000", // dev
  "https://klickks-auth.vercel.app" // vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests (like Postman)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you are using cookies/auth
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(morgan("dev"));

// ✅ Test root
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Routes
app.use("/auth", require("./routes/authRoutes")); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
