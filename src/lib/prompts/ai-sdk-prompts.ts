/**
 * ai-sdk-prompts.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * A curated suite of deterministic prompt templates for building type-safe,
 * production-grade Agentic AI applications with the Vercel AI SDK.
 *
 * Each entry is static and database-driven (deterministicScore is fixed).
 * All patterns target: ai@4+, Bun 1.2+, TypeScript strict mode.
 */

import type { Prompt } from "@/types/prompt";

export const AI_SDK_PROMPTS: Prompt[] = [
  // ── 1. Zod Schema Generator ─────────────────────────────────────────────
  {
    id: "aisdk-001",
    slug: "ai-sdk-zod-schema-generator",
    title: "AI SDK · Deterministic Zod Schema Generator",
    description:
      "Generate a fully-typed Zod schema from a plain-English description. Produces z.object() definitions with .describe() annotations that wire directly into streamObject() for zero-hallucination structured output.",
    category: "ai-sdk",
    tags: ["zod", "streamObject", "structured-output", "type-safe"],
    isPremium: true,
    copyCount: 2341,
    deterministicScore: 97,
    modelOptimizations: {
      claude: "Uses XML task block to force literal schema output without prose wrapping.",
      gpt: "Markdown sections guide GPT-4o to produce valid z.object() with no extra commentary.",
      cursor: "Cursor target includes tsconfig path aliases so imports resolve automatically.",
    },
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2026-03-15"),
    variables: [
      {
        key: "EntityDescription",
        label: "Entity Description",
        placeholder: "A user profile with name, email, role (admin|user), and optional bio.",
        required: true,
      },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun + AI SDK",
        systemInstructions: `Generate a production-grade Zod schema for the following entity:

[EntityDescription]

Requirements:
- Use z.object() at the root.
- Annotate every field with .describe("...") for AI SDK structured output compatibility.
- Use z.enum([...]) for union string literals.
- Mark optional fields with .optional().
- Export the schema as a named const and derive the TypeScript type using z.infer<>.
- Do NOT use z.any() or z.unknown() — every field must be strongly typed.

Output format:
\`\`\`typescript
import { z } from "zod";

export const entitySchema = z.object({ ... });
export type Entity = z.infer<typeof entitySchema>;
\`\`\``,
      },
    ],
  },

  // ── 2. Tool-Calling Handler ──────────────────────────────────────────────
  {
    id: "aisdk-002",
    slug: "ai-sdk-tool-calling-handler",
    title: "AI SDK · Type-Safe Tool-Calling Handler",
    description:
      "Scaffold a complete tool() definition using the Vercel AI SDK. Includes a Zod parameters schema, execute() function with typed args, and error boundary. Ready to drop into generateText() or streamText().",
    category: "ai-sdk",
    tags: ["tool-calling", "generateText", "streamText", "zod"],
    isPremium: true,
    copyCount: 1876,
    deterministicScore: 95,
    modelOptimizations: {
      claude: "XML chain-of-thought enforces tool description quality — critical for Claude tool selection accuracy.",
      gpt: "Markdown format prompts GPT-4o to produce the execute() body with explicit error handling.",
      cursor: "Cursor format injects the active tsconfig so tool import paths resolve against your workspace.",
    },
    createdAt: new Date("2025-12-01"),
    updatedAt: new Date("2026-03-20"),
    variables: [
      {
        key: "ToolName",
        label: "Tool Name",
        placeholder: "searchDocumentation",
        required: true,
      },
      {
        key: "ToolPurpose",
        label: "Tool Purpose",
        placeholder: "Search the documentation database and return the top 3 relevant sections.",
        required: true,
      },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun + AI SDK",
        systemInstructions: `Create a type-safe Vercel AI SDK tool definition.

Tool Name: [ToolName]
Purpose: [ToolPurpose]

Requirements:
- Use the tool() helper from "ai".
- Define a Zod parameters schema — every parameter must have .describe().
- The execute() function must be async and have an explicit return type.
- Wrap the execute body in try/catch and return a typed error object on failure.
- The tool description must be declarative and action-oriented (used by the LLM for selection).

Output format:
\`\`\`typescript
import { tool } from "ai";
import { z } from "zod";

export const [ToolName] = tool({
  description: "...",
  parameters: z.object({ ... }),
  execute: async (args): Promise<...> => { ... },
});
\`\`\``,
      },
    ],
  },

  // ── 3. Streaming Response Optimizer ─────────────────────────────────────
  {
    id: "aisdk-003",
    slug: "ai-sdk-streaming-response-optimizer",
    title: "AI SDK · Streaming Response Route Optimizer",
    description:
      "Build an ultra-lightweight Next.js 15 Route Handler that streams AI responses using Vercel AI SDK's streamText(). Uses toDataStreamResponse() for seamless useChat() integration with zero unnecessary buffering.",
    category: "ai-sdk",
    tags: ["streamText", "route-handler", "useChat", "streaming"],
    isPremium: true,
    copyCount: 3102,
    deterministicScore: 98,
    modelOptimizations: {
      claude: "XML structure forces analysis of Bun I/O model before generating the streaming handler.",
      gpt: "Markdown format produces clean route handler with explicit error status codes.",
      cursor: "Cursor XML includes file path directives to create the file at the correct app/api/ location.",
    },
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-04-01"),
    variables: [
      {
        key: "ModelName",
        label: "AI Model",
        placeholder: "claude-3-5-sonnet-20241022",
        required: true,
      },
      {
        key: "SystemPrompt",
        label: "System Prompt",
        placeholder: "You are a helpful engineering assistant specializing in Bun.js.",
        required: false,
      },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun + AI SDK",
        systemInstructions: `Generate a production-ready Next.js 15 Route Handler for streaming AI responses.

Model: [ModelName]
System Prompt: [SystemPrompt]

Requirements:
- Use streamText() from "ai" and the correct model provider package.
- Return toDataStreamResponse() for useChat() / useCompletion() compatibility.
- Export a named POST function — do NOT use default exports.
- Set export const runtime = "edge" for Bun/Edge compatibility.
- Handle AbortSignal via the request's signal property.
- Never buffer the full response in memory.
- Use Bun.env for API keys — no dotenv.

Output format:
\`\`\`typescript
// app/api/chat/route.ts
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> { ... }
\`\`\``,
      },
    ],
  },

  // ── 4. Agentic Multi-Step Executor ──────────────────────────────────────
  {
    id: "aisdk-004",
    slug: "ai-sdk-agentic-multi-step-executor",
    title: "AI SDK · Agentic Multi-Step Executor",
    description:
      "Scaffold a maxSteps-driven agentic loop with generateText(). The agent uses tool results to drive subsequent reasoning steps, enabling full autonomous task completion with deterministic termination conditions.",
    category: "ai-sdk",
    tags: ["agentic", "maxSteps", "tool-calling", "generateText"],
    isPremium: true,
    copyCount: 987,
    deterministicScore: 92,
    modelOptimizations: {
      claude: "XML CoT enforces the agent loop design: tool inventory → step plan → termination predicate.",
      gpt: "Markdown sections prompt GPT-4o to reason about the termination condition first.",
      cursor: "Cursor target includes file-path directive and imports from the existing tools/ directory.",
    },
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-04-02"),
    variables: [
      {
        key: "AgentGoal",
        label: "Agent Goal",
        placeholder: "Autonomously research a topic, summarize findings, and write a report to disk.",
        required: true,
      },
      {
        key: "MaxSteps",
        label: "Max Steps",
        placeholder: "10",
        required: false,
      },
    ],
    versions: [
      {
        version: "bun",
        label: "Bun + AI SDK",
        systemInstructions: `Build a type-safe agentic executor using Vercel AI SDK's generateText() with tool calling.

Goal: [AgentGoal]
Max Steps: [MaxSteps]

Requirements:
- Use generateText() with maxSteps to bound execution.
- Define at least 2 tools relevant to the goal using the tool() helper.
- Each tool must have a Zod parameters schema and typed execute() return.
- After loop completion, access result.steps[] for a deterministic audit trail.
- Use Bun.file() / Bun.write() for any file operations.
- Log each step's toolCalls and toolResults for observability.

Output format:
\`\`\`typescript
// agents/[agentName].ts
import { generateText } from "ai";
import { tool } from "ai";
import { z } from "zod";

const result = await generateText({
  model: ...,
  maxSteps: [MaxSteps],
  tools: { ... },
  prompt: "...",
});
\`\`\``,
      },
    ],
  },
];
