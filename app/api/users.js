import { openDB } from "../../db/db";

const users = [];
async function handler(req, res) {
  const db = await openDB();

  if (req.method === "GET") {
    users = [...(await db.all("SELECT * FROM users"))];
    res.status(200).json(users);
    return users;
  } else {
    res.status(405).end();
  }
}
handler();
export default users;
