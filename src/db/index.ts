import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";

const dbPath = path.join(process.cwd(), "prompt-flow.db");

const sqlite = new Database(dbPath, {
  // Use a longer timeout for concurrent heavy load
  timeout: 5000,
});

// Enable WAL mode for high-concurrency read-write stability
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("synchronous = NORMAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("cache_size = -2000");

export const db = drizzle(sqlite, { schema });

export type DB = typeof db;
