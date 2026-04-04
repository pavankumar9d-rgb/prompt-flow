import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index";
import path from "path";

export async function runMigrations() {
  console.log("⏳ Initializing database...");
  try {
    // Run migrations from the migrations folder
    migrate(db, { migrationsFolder: path.join(process.cwd(), "src/db/migrations") });
    console.log("✅ Database schema is up to date.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}
