import * as sqlite3 from "sqlite3";
import { resolve } from "path";

const dbPath = resolve("./database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Error opening database", err.message);
  else console.log("Connected to the sqlite database");
});

export default db;
