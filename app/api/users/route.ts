import { NextResponse } from "next/server";
import { FontSize, Theme, User } from "../../layout";
import openDB from "../dbHandler";

function fetchFromDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const rows: User[] = await db.all("SELECT * FROM users");
      db.close();
      resolve(rows);
    } catch (err: any) {
      console.error(err.message);
      reject(err);
    }
  });
}

async function updateInDB(user: Partial<User>) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const updates: string[] = [];
      const values: (Theme | FontSize | number)[] = [];

      if (user.theme) {
        updates.push("theme = ?");
        values.push(user.theme);
      }

      if (user.font_size) {
        updates.push("font_size = ?");
        values.push(user.font_size);
      }

      values.push(user.id as number);

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      const result = await db.run(query, values);

      db.close();
      resolve(result);
    } catch (err: any) {
      console.error(err.message);
      reject(err);
    }
  });
}

export async function GET() {
  try {
    const data = await fetchFromDB();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await updateInDB(body);
    return NextResponse.json(
      { message: "User settings updated successfully!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
