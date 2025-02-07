import openDB from "../dbHandler";
import { NextResponse } from "next/server";
import { User } from "../../layout";

function fetchFromDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const rows: User[] = await db.all("SELECT * FROM users");
      db.close();
      resolve(rows);
    } catch (err: any) {
      console.log(err.message);
      reject(err);
    }
  });
}

export async function GET() {
  try {
    const data = await fetchFromDB();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
