import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql);

export async function handler() {
  const users = await db.select().from("users");
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
}
