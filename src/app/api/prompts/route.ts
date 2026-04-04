import { NextResponse } from "next/server";
import { db } from "@/db";
import { prompts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allPrompts = await db.select().from(prompts).orderBy(desc(prompts.createdAt));
    return NextResponse.json(allPrompts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}
