import sqlite3 from "sqlite3";
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
      console.error("Error al verificar usuarios:", err.message);
      return;
    }
    if (row.count === 0) {
      const insertStmt = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?)");
      insertStmt.run("Juan", "juan@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q","ADMIN");
      insertStmt.run("Maria", "maria@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q" , "EMPLOYEE");
      insertStmt.run("Ariana", "ariana@example.com", "$2y$10$x38z7LllQAR8Q8J9M4l7.OeSjzKpEjeoU58M5RUdnYUhW9CSIs76q","DELIVERY");
      insertStmt.finalize((err) => {
        if (err) {
          console.error("Error inserting initial users:", err.message);
        } else {
          console.log("Predefined initial users added successfully.");
        }
      });
    } else {
      console.log("The table users is not empty, no predefined users added.");
    }
  });
});

export default db;