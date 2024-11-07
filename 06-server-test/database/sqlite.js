const sqlite3 = require("sqlite3");
const logger = require('../utils/logger.js');
const db = new sqlite3.Database('./users.db');

// Create users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role  TEXT NOT NULL
    )
  `);

  //Insert users if the table is empty
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (err) {
      logger.error("Error verifying users:", err.message);
      return;
    }
    if (row.count === 0) {
      const insertStmt = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
      insertStmt.run("Juan", "juan@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q","ADMIN");
      insertStmt.run("Maria", "maria@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q" , "USER");
      insertStmt.run("Ariana", "ariana@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q","USER");
      insertStmt.finalize((err) => {
        if (err) {
          logger.error("Error inserting initial users:", err.message);
        } else {
          logger.info("Predefined initial users added successfully.");
        }
      });
    } else {
      logger.info("The table users is not empty, no predefined users added.");
    }
  });
});

module.exports = db