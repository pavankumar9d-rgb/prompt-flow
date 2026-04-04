/**
 * mock-prompts.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all static mock prompts used across pages.
 * In production these are fetched from the Drizzle/SQLite database.
 * deterministicScore is static / DB-driven per product requirements.
 */

import type { Prompt, PromptCategory } from "@/types/prompt";
import { AI_SDK_PROMPTS } from "@/lib/prompts/ai-sdk-prompts";

const BASE = (
  id: string,
  slug: string,
  title: string,
  description: string,
  category: PromptCategory,
  tags: string[],
  isPremium: boolean,
  copyCount: number,
  deterministicScore: number,
  modelOptimizations: { claude: string; gpt: string; cursor: string },
  updatedAt: Date
): Prompt => ({
  id,
  slug,
  title,
  description,
  category,
  tags,
  isPremium,
  copyCount,
  deterministicScore,
  modelOptimizations,
  createdAt: new Date("2025-10-01"),
  updatedAt,
  variables: [],
  versions: [{ version: "bun", label: "Bun", systemInstructions: "" }],
});

export const MOCK_PROMPTS: Prompt[] = [
  BASE(
    "1", "bun-runtime-error-diagnostics",
    "Bun Runtime Error Diagnostics",
    "Systematically diagnose and fix runtime errors in Bun.js applications using structured stack trace analysis and native Bun APIs.",
    "debug", ["bun", "debugging", "runtime", "stack-trace"],
    false, 342, 96,
    {
      claude: "XML CoT forces root-cause analysis before any code suggestion — eliminates speculative fixes.",
      gpt:    "Markdown chain-of-thought instructs GPT-4o to reference the injected error stack first.",
      cursor: "Cursor XML targets the exact failing file line from the stack trace for surgical edits.",
    },
    new Date("2026-03-28")
  ),
  BASE(
    "2", "nextjs-server-action-factory",
    "Next.js Server Action Factory",
    "Generate type-safe Next.js 15 Server Actions with Zod validation, optimistic updates, and error boundaries — zero boilerplate.",
    "boilerplate", ["nextjs", "server-actions", "zod", "type-safe"],
    true, 890, 94,
    {
      claude: "XML task block enforces Zod schema generation before the action body — prevents type drift.",
      gpt:    "Markdown guides GPT-4o through the complete action lifecycle: validate → mutate → revalidate.",
      cursor: "Cursor format injects tsconfig paths so 'use server' imports resolve to your project structure.",
    },
    new Date("2026-04-01")
  ),
  BASE(
    "3", "elysia-api-route-generator",
    "Elysia.js API Route Generator",
    "Generate fully-typed, production-ready Elysia.js API routes with request validation and Drizzle ORM integration.",
    "boilerplate", ["elysia", "bun", "api", "drizzle"],
    false, 512, 93,
    {
      claude: "XML runtime constraints block forces Bun.serve() patterns — prevents accidental Express.js output.",
      gpt:    "Markdown structure prompts complete route with Elysia TypeBox schema attached.",
      cursor: "Cursor directives point edits to the correct src/routes/ file in your project.",
    },
    new Date("2026-03-15")
  ),
  BASE(
    "4", "typescript-algorithm-optimizer",
    "TypeScript Algorithm Optimizer",
    "Transform naive algorithms into optimal TypeScript implementations using Big-O analysis and Bun-native data structures.",
    "logic", ["algorithms", "typescript", "optimization", "big-o"],
    true, 215, 91,
    {
      claude: "XML CoT mandates Big-O analysis step before suggesting the optimized implementation.",
      gpt:    "Markdown forces before/after complexity comparison with explicit reasoning.",
      cursor: "Cursor XML scopes the optimization to the active function — avoids touching surrounding context.",
    },
    new Date("2026-03-20")
  ),
  BASE(
    "5", "drizzle-query-analyzer",
    "Drizzle ORM Query Analyzer",
    "Analyze, debug and optimize Drizzle ORM queries — from N+1 detection to index recommendations.",
    "debug", ["drizzle", "sql", "performance", "orm"],
    true, 421, 89,
    {
      claude: "XML structure forces query plan analysis before any optimization suggestion.",
      gpt:    "Markdown produces N+1 detection checklist followed by corrected query.",
      cursor: "Cursor targets the exact query file, preserving surrounding Drizzle schema context.",
    },
    new Date("2026-03-10")
  ),
  BASE(
    "6", "bun-prisma-mismatch-solver",
    "Bun + Prisma Schema Mismatch Solver",
    "Deterministic resolution for Prisma client mismatches in Bun runtimes. Reduce 45-min debugging to 2 minutes.",
    "debug", ["bun", "prisma", "database", "orm"],
    true, 1420, 92,
    {
      claude: "XML error stack injection pinpoints the exact Prisma client version mismatch.",
      gpt:    "Markdown step-by-step resolution: regenerate → rebind → validate.",
      cursor: "Cursor XML injects package.json dep versions to prevent version-regression fixes.",
    },
    new Date("2026-02-14")
  ),
  BASE(
    "7", "ai-sdk-stream-object-generator",
    "AI SDK · StreamObject Generator",
    "Generate deterministic, type-safe streaming objects using Vercel AI SDK streamObject() with a Zod schema.",
    "ai-sdk", ["vercel-ai-sdk", "zod", "streaming", "structured-output"],
    true, 1840, 98,
    {
      claude: "XML task block enforces schema-first design — Zod schema generated before streamObject call.",
      gpt:    "Markdown chain-of-thought produces complete route handler with type assertions at each step.",
      cursor: "Cursor format includes exact file path for the new route + tsconfig alias resolution.",
    },
    new Date("2026-04-01")
  ),
  BASE(
    "8", "ai-sdk-tool-architect",
    "AI SDK · Tool Call Architect",
    "Implement complex, type-safe Tool Calling in the Vercel AI SDK with Zod params and full error boundaries.",
    "ai-sdk", ["vercel-ai-sdk", "tools", "function-calling", "zod"],
    true, 2150, 95,
    {
      claude: "XML CoT enforces tool description quality — critical for Claude tool selection accuracy.",
      gpt:    "Markdown produces the execute() body with explicit error handling blocks.",
      cursor: "Cursor format injects tsconfig so tool import paths resolve against your workspace.",
    },
    new Date("2026-03-25")
  ),
  BASE(
    "9", "drizzle-elysia-boilerplate",
    "Drizzle + Elysia Full-Stack Boilerplate",
    "Scaffold a complete Bun + Elysia + Drizzle ORM full-stack project with auth, validation, and migrations pre-wired.",
    "architecture", ["bun", "elysia", "drizzle", "boilerplate"],
    true, 678, 90,
    {
      claude: "XML CoT enforces architecture planning (schema → routes → validation) before code generation.",
      gpt:    "Markdown produces a phased scaffold plan followed by complete file listings.",
      cursor: "Cursor XML creates files at precise paths within your existing project structure.",
    },
    new Date("2026-03-18")
  ),
  BASE(
    "10", "vitest-bun-test-generator",
    "Vitest + Bun Test Generator",
    "Generate comprehensive Vitest test suites for Bun projects: unit, integration, and mock boundary tests.",
    "testing", ["vitest", "bun", "testing", "unit-tests"],
    false, 303, 88,
    {
      claude: "XML task block forces dependency injection analysis before test scaffold generation.",
      gpt:    "Markdown produces a test suite skeleton with describe/it structure and boundary cases.",
      cursor: "Cursor XML creates test files co-located with the source file under test.",
    },
    new Date("2026-03-05")
  ),
  // Merge in AI SDK suite prompts (they already have all required fields)
  ...AI_SDK_PROMPTS,
];

// Convenience: single prompt lookup by slug
export function getPromptBySlug(slug: string): Prompt | undefined {
  return MOCK_PROMPTS.find((p) => p.slug === slug);
}
