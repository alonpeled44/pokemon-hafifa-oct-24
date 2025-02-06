import { NextResponse } from "next/server";
import db from "../../../db/db";

export async function GET(req: Request) {
  if (req.method === "GET") {
    return NextResponse.json({});
  }
}
