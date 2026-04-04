import { formatPrompt } from "../lib/formatPrompt";

const testCases = [
  {
    category: "Debug",
    title: "Bun + Prisma Mismatch Solver",
    template: `You are a Prisma + Bun runtime specialist. 
Your task is to fix the following Prisma mismatch in a Bun environment.

## Error
[PrismaError]

## Schema
[Schema]

## Protocol
1. Identify if the binary target is missing for Bun/Debian.
2. Check for version drift between 'prisma' and '@prisma/client'.
3. Provide the EXACT shell commands to sync the client.

Output format: Exact CLI commands + optimized schema snippet.`,
    variables: {
      PrismaError: "PrismaClientInitializationError: Binary mismatch for debian-openssl-1.1.x",
      Schema: 'datasource db { provider = "postgresql"; url = env("DATABASE_URL") }'
    }
  },
  {
    category: "AI-SDK",
    title: "AI SDK StreamObject Generator",
    template: `You are a Vercel AI SDK specialist. Generate a deterministic 'streamObject' implementation.

## Goal
Generate a structured object for: [TargetObject]

## Data Requirements
[ZodSchema]

Output ONLY the TypeScript code blocks. No explanations.`,
    variables: {
      TargetObject: "A list of 5 high-protein recipes",
      ZodSchema: "name (string), protein_grams (number), ingredients (array of strings)"
    }
  }
];

console.log("🌊 PROMPT-FLOW: ENGINEERING INTELLIGENCE SYSTEM TEST\n");

testCases.forEach((tc) => {
  console.log(`--- CATEGORY: ${tc.category.toUpperCase()} ---`);
  console.log(`PROMPT: ${tc.title}`);
  
  const result = formatPrompt(tc.title, tc.template, tc.variables as any, "claude");
  
  console.log("\nRENDERED OUTPUT (CLAUDE XML OPTIMIZED):");
  console.log(result);
  console.log("\n" + "=".repeat(50) + "\n");
});
