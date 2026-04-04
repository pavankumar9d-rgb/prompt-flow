import { db } from "./index";
import { prompts } from "./schema";

const samplePrompts = [
  // ── Debug ──────────────────────────────────────────────────────────────────
  {
    slug: "bun-runtime-error-diagnostics",
    title: "Bun Runtime Error Diagnostics",
    description: "Deterministic diagnosis for Bun.js runtime failures. Eliminates guesswork by identifying root causes in under 60 seconds.",
    category: "debug" as const,
    isPremium: false,
    tags: ["bun", "debugging", "runtime", "typescript"],
    variables: [
      { key: "ErrorMessage",  label: "Error Message",   placeholder: "Paste the full error stack trace here", required: true },
      { key: "CodeContext",   label: "Code Context",    placeholder: "Paste the relevant code block (10-30 lines)", required: true },
      { key: "BunVersion",   label: "Bun Version",     placeholder: "e.g. 1.2.5", required: false },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are an expert Bun.js runtime engineer. Your task is to diagnose and fix the following error.

## Error
\`\`\`
[ErrorMessage]
\`\`\`

## Code Context
\`\`\`typescript
[CodeContext]
\`\`\`

## Your Analysis Protocol
1. Identify the root cause (not just the symptom).
2. Check if this is a Bun-specific API issue vs. a generic JavaScript error.
3. Provide a corrected code snippet using modern Bun APIs.
4. Add a one-line explanation of WHY this error occurred.

Bun Version: [BunVersion]
Output format: corrected TypeScript code block + a brief explanation. No markdown headers.`,
      },
      {
        version: "nodejs",
        label: "Node.js (Legacy)",
        systemInstructions: `You are an expert Node.js engineer. Diagnose the following error using Node.js conventions.

Error: [ErrorMessage]
Code: [CodeContext]

Provide: corrected CommonJS/ESM code + explanation.`,
      },
    ],
  },

  // ── Boilerplate ────────────────────────────────────────────────────────────
  {
    slug: "elysia-api-route-generator",
    title: "Elysia.js API Route Generator",
    description: "Generate fully-typed, production-ready Elysia.js API routes with validation, error handling, and Drizzle ORM integration.",
    category: "boilerplate" as const,
    isPremium: false,
    tags: ["elysia", "bun", "api", "drizzle", "typescript"],
    variables: [
      { key: "ResourceName", label: "Resource Name",   placeholder: "e.g. User, Post, Product", required: true },
      { key: "Schema",       label: "Database Schema", placeholder: "Paste your Drizzle table schema here", required: true },
      { key: "Endpoint",     label: "API Endpoint",    placeholder: "e.g. /api/v1/users", required: true },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are a senior Bun/Elysia.js architect. Generate a complete, production-ready API route file.

## Resource: [ResourceName]
## Target Endpoint: [Endpoint]
## Database Schema (Drizzle):
\`\`\`typescript
[Schema]
\`\`\`

## Requirements
- Use Elysia.js with TypeBox validation schemas
- Include: GET (list + paginate), GET /:id, POST, PUT /:id, DELETE /:id
- Use Drizzle ORM for all database operations
- Add proper error handling with typed error responses
- Include JSDoc comments on each route
- Export as a named Elysia plugin (not a default export)

Output ONLY the TypeScript file content. No explanations.`,
      },
      {
        version: "nodejs",
        label: "Node.js (Legacy)",
        systemInstructions: `Generate an Express.js REST API for [ResourceName] resource at [Endpoint].
Schema: [Schema]
Include: CRUD routes, express-validator, and Prisma ORM.`,
      },
      {
        version: "deno",
        label: "Deno (Secure)",
        systemInstructions: `Generate a Deno Fresh API handler for [ResourceName] at [Endpoint].
Schema: [Schema]
Use Deno's native fetch and Oak middleware.`,
      },
    ],
  },

  // ── Logic ──────────────────────────────────────────────────────────────────
  {
    slug: "typescript-algorithm-optimizer",
    title: "TypeScript Algorithm Optimizer",
    description: "Transform naive algorithms into optimal TypeScript implementations using Big-O analysis and modern data structures.",
    category: "logic" as const,
    isPremium: true,
    tags: ["algorithms", "typescript", "optimization", "performance"],
    variables: [
      { key: "Algorithm",   label: "Current Algorithm",  placeholder: "Paste your current implementation", required: true },
      { key: "DataShape",   label: "Input Data Shape",   placeholder: "Describe the shape and typical size of input data", required: true },
      { key: "Constraints", label: "Constraints",        placeholder: "Memory limit, time limit, any special constraints", required: false },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are a competitive programmer and TypeScript expert. Optimize the following algorithm.

## Current Implementation
\`\`\`typescript
[Algorithm]
\`\`\`

## Input Data Shape
[DataShape]

## Constraints
[Constraints]

## Your Task
1. Analyze the current Big-O time and space complexity.
2. Identify the performance bottleneck.
3. Provide an optimized implementation in strict TypeScript.
4. Show the new Big-O analysis.
5. Write a brief test case to verify correctness.

Use modern TypeScript features: generics, utility types, type predicates.
Target: Bun runtime optimizations (native Buffer, fast I/O).`,
      },
    ],
  },

  // ── Boilerplate (Premium) ──────────────────────────────────────────────────
  {
    slug: "nextjs-server-action-factory",
    title: "Next.js Server Action Factory",
    description: "Generate type-safe Next.js Server Actions with Zod validation, optimistic updates, and error boundaries.",
    category: "boilerplate" as const,
    isPremium: true,
    tags: ["nextjs", "server-actions", "zod", "typescript"],
    variables: [
      { key: "ActionName",   label: "Action Name",    placeholder: "e.g. createPost, updateUser", required: true },
      { key: "InputSchema",  label: "Input Schema",   placeholder: "Describe the input fields and their types", required: true },
      { key: "DbOperation",  label: "DB Operation",   placeholder: "Describe what the action should do in the database", required: true },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are a Next.js 15 App Router specialist. Generate a complete server action.

## Action: [ActionName]
## Input: [InputSchema]  
## DB Operation: [DbOperation]

Generate:
1. A Zod schema for input validation
2. The server action function (use 'use server')
3. A React hook for calling it with optimistic updates (useOptimistic)
4. TypeScript return types (success | error discriminated union)

Use: next-safe-action or raw Server Actions with try/catch.
Output: 3 code blocks (schema, action, hook). No prose.`,
      },
    ],
  },

  // ── Debug (Premium) ───────────────────────────────────────────────────────
  {
    slug: "drizzle-query-analyzer",
    title: "Drizzle ORM Query Analyzer",
    description: "Analyze, debug and optimize Drizzle ORM queries — from N+1 detection to index recommendations.",
    category: "debug" as const,
    isPremium: true,
    tags: ["drizzle", "sql", "optimization", "postgresql", "sqlite"],
    variables: [
      { key: "Query",      label: "Drizzle Query",    placeholder: "Paste your Drizzle ORM query code", required: true },
      { key: "Schema",     label: "Table Schema",     placeholder: "Paste relevant Drizzle table definitions", required: true },
      { key: "QueryPlan",  label: "EXPLAIN output",   placeholder: "Optional: paste EXPLAIN ANALYZE output", required: false },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are a database performance expert specializing in Drizzle ORM and SQLite/PostgreSQL.

## Query Under Review
\`\`\`typescript
[Query]
\`\`\`

## Schema
\`\`\`typescript
[Schema]
\`\`\`

## EXPLAIN Output (if available)
\`\`\`sql
[QueryPlan]
\`\`\`

## Analysis Protocol
1. Detect N+1 query patterns
2. Identify missing indexes
3. Suggest query restructuring (joins vs. subqueries)
4. Provide the optimized Drizzle query
5. Recommend index definitions using Drizzle's \`index()\` helper

Output: analysis bullet points + optimized code. Be direct, no fluff.`,
      },
    ],
  },
  // ── Specialty (The High-Value Example) ──────────────────────────────────────
  {
    slug: "bun-prisma-mismatch-solver",
    title: "Bun + Prisma Schema Mismatch Solver",
    description: "Deterministic resolution for Prisma client mismatches in Bun runtimes. Reduces 45min debugging to 2min.",
    category: "debug" as const,
    isPremium: true,
    tags: ["bun", "prisma", "database", "orm"],
    variables: [
      { key: "PrismaError", label: "Prisma Error", placeholder: "Paste the 'PrismaClientInitializationError' here", required: true },
      { key: "Schema",      label: "Prisma Schema", placeholder: "Paste your schema.prisma content", required: true },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are a Prisma + Bun runtime specialist. 
Your task is to fix the following Prisma mismatch in a Bun environment.

## Error
[PrismaError]

## Schema
[Schema]

## Protocol
1. Identify if the binary target is missing for Bun/Debian.
2. Check for version drift between 'prisma' and '@prisma/client'.
3. Provide the EXACT shell commands to sync the client.
4. Output an optimized 'datasource' block if necessary.

Output format: Exact CLI commands + optimized schema snippet. Done in under 60s.`,
      },
    ],
  },
  // ── AI SDK (Vercel) ────────────────────────────────────────────────────────
  {
    slug: "ai-sdk-stream-object-generator",
    title: "AI SDK StreamObject Generator",
    description: "Generate deterministic, type-safe streaming objects using Vercel AI SDK and Zod. Bridging prompt to production.",
    category: "ai-sdk" as const,
    isPremium: true,
    tags: ["vercel-ai-sdk", "zod", "streaming"],
    variables: [
      { key: "TargetObject", label: "Object Description", placeholder: "e.g. A list of 5 healthy recipes with calories", required: true },
      { key: "ZodSchema",    label: "Field Details",    placeholder: "Describe the fields needed (name, price, etc.)", required: true },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun/Next.js",
        systemInstructions: `You are a Vercel AI SDK specialist. Generate a deterministic 'streamObject' implementation.

## Goal
Generate a structured object for: [TargetObject]

## Data Requirements
[ZodSchema]

## Your Protocol
1. Define a precise Zod schema for the object.
2. Generate the Next.js Server Action using 'streamObject'.
3. Use 'openai' or 'anthropic' provider (latest models).
4. Include the 'onFinish' callback for database persistence.
5. Provide a basic React client component using 'useObject' to display the result.

Output ONLY the TypeScript code blocks. No explanations.`,
      },
    ],
  },
  {
    slug: "ai-sdk-tool-architect",
    title: "AI SDK Tool Call Architect",
    description: "Implement complex, type-safe Tool Calling (function calling) in the Vercel AI SDK with error boundaries.",
    category: "ai-sdk" as const,
    isPremium: true,
    tags: ["vercel-ai-sdk", "tools", "function-calling"],
    variables: [
      { key: "ToolName",     label: "Tool Name",       placeholder: "e.g. get_weather, search_db", required: true },
      { key: "Description",  label: "Tool Purpose",    placeholder: "What should this tool actually do?", required: true },
      { key: "BackendLogic", label: "Existing Logic",  placeholder: "Paste your existing TypeScript function signature/logic", required: true },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun (Modern)",
        systemInstructions: `You are an expert AI SDK engineer. Implement a robust 'tool' in the Vercel AI SDK.

## Tool: [ToolName]
## Purpose: [Description]
## Logic: [BackendLogic]

## Your Protocol
1. Create a type-safe 'tool' definition for the 'tools' object.
2. Use Zod for parameter validation.
3. Implement the 'execute' property, wrapping the backend logic.
4. Add error handling inside 'execute' to return meaningful context to the LLM.
5. Show how to integrate this tool into 'streamText'.

Output: deterministic code block for the tool definition + implementation.`,
      },
    ],
  },
];

export async function seedPrompts() {
  console.log("🌱 Seeding Prompt-Flow database...");

  try {
    // Clear existing to avoid duplicates on auto-seed
    await db.delete(prompts).execute();

    for (const p of samplePrompts) {
      await db.insert(prompts).values({
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        versions: p.versions,
        variables: p.variables,
        tags: p.tags,
        isPremium: p.isPremium,
        copyCount: Math.floor(Math.random() * 500),
      }).execute();
      console.log(`  ✅ ${p.title}`);
    }

    console.log(`\n✨ Seeded ${samplePrompts.length} prompts.`);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    throw err;
  }
}

// Support manual run if not being imported
if (require.main === module) {
  seedPrompts().catch(() => process.exit(1));
}
