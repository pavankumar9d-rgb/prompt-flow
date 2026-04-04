import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

// Shared sqlite instance for auth
const dbPath = path.join(process.cwd(), "prompt-flow.db");
const sqlite = new Database(dbPath);

export const auth = betterAuth({
  database: sqlite,
  emailAndPassword: {
    enabled: true,
  },
  // Add providers or custom fields here
});
