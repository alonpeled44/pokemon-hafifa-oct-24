import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

interface User {
  id: number;
  username: string;
  password: string;
}

const fetchDataFromDb = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Opening");
      const db = await open({
        filename: "/db.db",
        driver: sqlite3.Database,
      });
      console.log("Querying");
      db.all("SELECT * FROM users", (err: Error | null, rows: User[]) => {
        if (err) {
          console.log("data not retrieved");
          reject(err);
        } else {
          console.log("data retrieved:", rows);
          resolve(rows);
        }
        console.log("Closing");
        db.close();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export async function GET() {
  try {
    const data = await fetchDataFromDb();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
