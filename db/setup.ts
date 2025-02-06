import db from "./db";

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMERY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL)`);
  console.log("Table created or already exists.");
});
