const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email & password required" });

  const userid = uuidv4();
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run("INSERT INTO users (id, email, password) VALUES (?, ?, ?)", [userid, email, hashedPassword], function (err) {
    if (err) return res.status(400).json({ message: "User already exists" });
    res.json({ message: "User registered successfully" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    //  Save session
    req.session.user = { id: user.id, email: user.email };

    //  Explicitly send the session cookie in response
    res.status(200).json({ message: "Login successful", user: req.session.user });
  });
});

// Dashboard (protected)
router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });
  res.json({ message: "Welcome", user: req.session.user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid", { path: "/" });
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
