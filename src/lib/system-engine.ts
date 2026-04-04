/**
 * system-engine.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps raw prompt content in model-specific structured formats.
 *
 * Design rules:
 *  - Claude  → XML with <system_instruction>, <chain_of_thought>, <constraints>
 *  - GPT-4o  → Markdown sections optimised for OpenAI's system role
 *  - Cursor  → XML with <workspace_context> + file-path directives for Cursor IDE
 *
 * No Node.js APIs — pure TypeScript string manipulation, safe in any runtime.
 */

import type { LLMTarget } from "@/types/prompt";

// ─── Shared Bun runtime constraint block ─────────────────────────────────────

const BUN_RUNTIME_CONTEXT = `\
Bun v1.2+ Runtime Constraints:
- Use Bun.file() / Bun.write() for all file I/O — never Node fs/promises.
- Use Bun.password.hash() / Bun.password.verify() for credential hashing.
- Use Bun.serve() for HTTP — avoid the http/https Node modules.
- Use Bun.sqlite (built-in) or Drizzle ORM with better-sqlite3 for database access.
- Native fetch() is available globally — no node-fetch.
- Use Bun.env for environment variables — no dotenv.
- Performance: prefer Bun.ArrayBufferSink for high-throughput streaming.`;

// ─── Context injector block ───────────────────────────────────────────────────

export interface InjectedContext {
  packageJson?: ParsedPackageJson;
  tsConfig?: ParsedTsConfig;
  errorStack?: string;
  rawFiles?: Array<{ name: string; content: string }>;
}

export interface ParsedPackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

export interface ParsedTsConfig {
  compilerOptions?: Record<string, unknown>;
  paths?: Record<string, string[]>;
}

function buildContextBlock(ctx: InjectedContext): string {
  const parts: string[] = [];

  if (ctx.packageJson) {
    const deps = Object.entries(ctx.packageJson.dependencies ?? {})
      .map(([k, v]) => `  ${k}: ${v}`)
      .join("\n");
    const devDeps = Object.entries(ctx.packageJson.devDependencies ?? {})
      .map(([k, v]) => `  ${k}: ${v}`)
      .join("\n");
    parts.push(
      `<workspace_package_json>\n  name: ${ctx.packageJson.name ?? "unknown"}\n  version: ${ctx.packageJson.version ?? "unknown"}\n  dependencies:\n${deps || "  (none)"}\n  devDependencies:\n${devDeps || "  (none)"}\n</workspace_package_json>`
    );
  }

  if (ctx.tsConfig?.compilerOptions) {
    const opts = JSON.stringify(ctx.tsConfig.compilerOptions, null, 2)
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n");
    parts.push(`<workspace_tsconfig>\n${opts}\n</workspace_tsconfig>`);
  }

  if (ctx.errorStack) {
    parts.push(
      `<error_stack_trace priority="HIGHEST">\n${ctx.errorStack.trim()}\n</error_stack_trace>`
    );
  }

  return parts.length > 0
    ? `<injected_workspace_context>\n${parts.join("\n")}\n</injected_workspace_context>`
    : "";
}

// ─── Claude XML formatter ─────────────────────────────────────────────────────

function buildClaudeXml(
  title: string,
  content: string,
  ctx: InjectedContext
): string {
  const contextBlock = buildContextBlock(ctx);
  const isArchitecture = title.toLowerCase().includes("review") || title.toLowerCase().includes("arch");
  const protocolName = isArchitecture ? "AI Code Reviewer" : "Deterministic Bug Resolution";

  // Surgical Intelligence for XML
  let surgicalAdvice = "";
  if (title.includes("SQLite")) surgicalAdvice = "\n    <protocol>Use Bun.sqlite native module and verify Database path.</protocol>";
  if (title.includes("Hydration")) surgicalAdvice = "\n    <protocol>Gate window-dependent logic in useEffect to prevent hydration mismatch.</protocol>";
  if (isArchitecture) surgicalAdvice = "\n    <protocol>Enforce Best Practice and Clean Code standards.</protocol>";

  return `<system_instruction>
  <identity>You are a Principal Engineer specializing in Bun.js, Next.js 15, TypeScript, and the Vercel AI SDK. You operate with zero hallucination tolerance.</identity>

  <runtime_constraints>
    ${BUN_RUNTIME_CONTEXT.split("\n").join("\n    ")}
  </runtime_constraints>

  <chain_of_thought_protocol name="${protocolName}">
    Before providing any code solution, you MUST reason through:
    1. Identify Bun version context and constraints.
    2. Scan package.json for dependency conflicts or missing packages.
    3. Propose a type-safe solution using native Bun APIs.${surgicalAdvice}
  </chain_of_thought_protocol>

  <task name="${title}">
    ${content.split("\n").join("\n    ")}
  </task>
${contextBlock ? `\n  ${contextBlock.split("\n").join("\n  ")}` : ""}
  <output_format>
    - Respond with a structured solution: explanation → code block → usage example.
    - All code must be Bun-native, 100% TypeScript with strict mode.
    - Format: TypeScript code blocks with \`// bun\` shebang where applicable.
  </output_format>
</system_instruction>`;
}

// ─── GPT-4o Markdown formatter ────────────────────────────────────────────────

function buildGptMarkdown(
  title: string,
  content: string,
  ctx: InjectedContext
): string {
  const contextBlock = ctx.packageJson || ctx.tsConfig || ctx.errorStack
    ? `\n## Workspace Context\n\n${buildContextBlock(ctx)}\n`
    : "";

  const isArchitecture = title.toLowerCase().includes("review") || title.toLowerCase().includes("arch");
  const REQUIREMENT_BRANDING = isArchitecture 
    ? "AI Code Reviewer Protocol" 
    : "Deterministic Bug Resolution Checklist";

  // Surgical Intelligence: Inject specific advice based on the title/description
  let surgicalAdvice = "";
  if (title.includes("SQLite")) surgicalAdvice = "\n- **SQLite Protocol**: Use Bun.sqlite (native) over node-sqlite3. Check for .db-wal files.";
  if (title.includes("Hydration")) surgicalAdvice = "\n- **Hydration Protocol**: Use useEffect to gate client-only logic or suppressHydrationWarning.";
  if (title.includes("AI SDK")) surgicalAdvice = "\n- **AI SDK Protocol**: Ensure useChat/useCompletion hooks are correctly gated with check components.";
  if (isArchitecture) surgicalAdvice = "\n- **Review Protocol**: Identify Best Practice violations and suggest Refactor paths.";

  return `# System Instructions: ${title}

## Role
You are a Principal Engineer at a top-tier TypeScript/Bun.js shop. Respond with deterministic, production-grade solutions only.

## Runtime Rules
\`\`\`
${BUN_RUNTIME_CONTEXT}
\`\`\`

## ${REQUIREMENT_BRANDING}${surgicalAdvice}
Structure your response as:
1. **Root Cause Analysis** — What is actually broken or needed?
2. **Bun API Selection** — Which native Bun APIs apply?
3. **Solution Architecture** — Outline types → logic → I/O.
4. **Implementation** — Full TypeScript code with strict types.
5. **Edge Cases** — Call out and handle failure modes.
${contextBlock}
## Task
${content}

---
*Generated by Prompt-Flow Pro · Bun/TypeScript Engineering Intelligence*`;
}

// ─── Cursor IDE formatter ─────────────────────────────────────────────────────

function buildCursorXml(
  title: string,
  content: string,
  ctx: InjectedContext
): string {
  const contextBlock = buildContextBlock(ctx);
  return `<cursor_instruction>
  <task>${title}</task>

  <runtime_constraints>
    ${BUN_RUNTIME_CONTEXT.split("\n").join("\n    ")}
  </runtime_constraints>

  <file_awareness>
    - Resolve all imports against tsconfig.json \`paths\` aliases.
    - Respect the \`package.json\` dependency versions — do NOT suggest upgrading packages.
    - If an error stack is provided, fix ONLY the identified file and function.
  </file_awareness>

  <code_style>
    - TypeScript strict mode. Explicit return types on all functions.
    - Named exports only. No default exports in library files.
    - Bun-native APIs. Zero Node.js compatibility shims.
    - Zod for all runtime validation. Drizzle for all database access.
  </code_style>

  <workspace_context>
    Read @package.json and @tsconfig.json before writing code.
${contextBlock ? `\n    ${contextBlock.split("\n").join("\n    ")}` : ""}
  </workspace_context>
  <instruction>
    ${content.split("\n").join("\n    ")}
  </instruction>
</cursor_instruction>`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Wraps a prompt's system instructions in the correct model-specific XML/Markdown
 * structure, with optional injected workspace context.
 */
export function buildSystemPrompt(
  title: string,
  content: string,
  target: LLMTarget,
  ctx: InjectedContext = {}
): string {
  switch (target) {
    case "claude":
      return buildClaudeXml(title, content, ctx);
    case "gpt":
      return buildGptMarkdown(title, content, ctx);
    case "cursor":
      return buildCursorXml(title, content, ctx);
  }
}

/**
 * Parse the raw text of a package.json file into a strongly-typed structure.
 * Returns null if the content is not valid JSON.
 */
export function parsePackageJson(raw: string): ParsedPackageJson | null {
  try {
    const parsed = JSON.parse(raw) as ParsedPackageJson;
    return {
      name: parsed.name,
      version: parsed.version,
      dependencies: parsed.dependencies,
      devDependencies: parsed.devDependencies,
      scripts: parsed.scripts,
    };
  } catch {
    return null;
  }
}

/**
 * Parse the raw text of a tsconfig.json file into a strongly-typed structure.
 * Returns null if the content is not valid JSON.
 */
export function parseTsConfig(raw: string): ParsedTsConfig | null {
  try {
    // tsconfig supports comments — strip them naively before parsing
    const stripped = raw.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
    const parsed = JSON.parse(stripped) as { compilerOptions?: Record<string, unknown> };
    return {
      compilerOptions: parsed.compilerOptions,
      paths: parsed.compilerOptions?.paths as Record<string, string[]> | undefined,
    };
  } catch {
    return null;
  }
}
