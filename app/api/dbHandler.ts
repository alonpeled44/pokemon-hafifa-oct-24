import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export default function openDB() {
  return open({
    filename: path.join(process.cwd(), "db.db"),
    driver: sqlite3.Database,
    //The process.cwd() method returns the current working directory
  });
}
