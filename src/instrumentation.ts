export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { runMigrations } = await import("./db/migrate");
    const { db } = await import("./db/index");
    const { prompts } = await import("./db/schema");
    const { seedPrompts } = await import("./db/seed");
    
    try {
      // 1. Auto-migrate schema
      await runMigrations();

      // 2. Auto-seed if database is empty
      const existingPrompts = await db.select().from(prompts).limit(1);
      if (existingPrompts.length === 0) {
        console.log("🌱 Database is empty. Seeding initial data...");
        await seedPrompts();
        console.log("✅ Initial data seeded successfully.");
      }
    } catch (err) {
      console.error("🚨 Startup automation failed:", err);
    }
  }
}
