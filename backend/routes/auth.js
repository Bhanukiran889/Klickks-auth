const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const {v4: uuidv4} = require("uuidv4");

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (id, email, password) VALUES (?, ?, ?)";
  db.run(query, [uuidv4(),email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.json({ message: "User registered successfully" });
  });
});


module.exports = router;