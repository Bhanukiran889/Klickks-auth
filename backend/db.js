const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log(" Connected to SQLite database");

    // Create users table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY ,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
  }
});

module.exports = db;

