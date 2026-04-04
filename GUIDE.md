# 🌊 Prompt-Flow Pro: User & Implementation Guide

Welcome to **Prompt-Flow Pro**, the premier specialized engineering layer for Bun, Next.js, and TypeScript developers. This guide walks you through the entire experience, from utilizing the Bento dashboard to generating deterministic, production-grade AI solutions using the advanced System Engine.

---

## 🚀 1. The High-Fidelity Bento Dashboard

When you open **Prompt-Flow Pro**, you are greeted by an elite Bento Grid Dashboard designed exclusively for rapid engineering discovery.

1.  **Value Ladder Tiers**: The dashboard highlights three distinct paths:
    *   **Pro Launch**: Complete access to the prompt library and dashboard.
    *   **Enterprise License**: Includes pre-configured Drizzle/Elysia boilerplates.
    *   **Live Intelligence Feed**: A future subscription tier delivering 5-10 new deterministic prompts monthly.
    *   *Note: You can view and compare these tiers locally on the `/pricing` page, which includes the active comparison matrix and mock subscription UI states before the Lemon Squeezy integration goes live.*
2.  **Deterministic Score Badging**: Notice the spinning, neon-emerald `conic-gradient` ring (e.g., **96 DET**) on featured cards. This score indicates the prompt's reliability and resistance to AI hallucination. Simply **hover** over any prompt card and an animated panel will smoothly slide down explaining exactly how the prompt manages Context rules for Claude, GPT-4o, and Cursor.
3.  **System Categories**: Use the sidebar to filter specialized engineering layers, notably the new **Vercel AI SDK** category tailored for `streamObject` and type-safe tool calling.

---

## ⌨️ 2. The Universal CLI Workflow

For the most professional experience, use the Prompt-Flow CLI to bridge your local terminal to the dashboard. 

### Step A: Sync Local Context
Instead of manual drag-and-drop, run the following command in your project root:
```bash
bunx prompt-flow
```

### Step B: Smart Filtering
The CLI automatically scans your `package.json` and `tsconfig.json`. If your manifests are large (over 20KB), it applies a **Smart Filter** to strip out irrelevant `devDependencies` (like test scripts or linters) to keep the AI's context window focused strictly on production runtime logic.

### Step C: Auto-Detection
The CLI will automatically find your running dashboard on common ports (3000, 3001, etc.). If you have a custom setup, use the flag:
```bash
bunx prompt-flow --url http://localhost:3001
```

Once executed, your browser will launch directly into the dashboard with a green **`CLI_SYNC`** status badge confirmed.

---

## 🧪 3. Using an Elite Prompt

### Step A: Selection & Variable Injection
Click **View** on a prompt (like "Bun Runtime Error Diagnostics"). You'll see the Expert Persona instructions and variable inputs.

### Step B: The Multi-File Context Injector
Tired of copy-pasting entire files to give the AI context context? 
- Drag and drop your `package.json` into the **Context Injector** box. The system extracts your dependencies to ensure the AI doesn't suggest packages you don't use.
- Drop your `tsconfig.json` so the AI understands your project's path aliases (`@/components/*`).
- **Highest Priority**: Paste your raw Error Stack Trace directly into the injector. It overrides the context hierarchy to surgically address to the failing line of code.

### Step C: Target Versioning
Ensure the instruction target aligns with your environment. Toggle between **Modern Bun** and **Node.js (Legacy)**.

### Step D: Zero-Hallucination Exporting
Prompt-Flow Pro doesn't just copy text—it passes it through our **System Engine** to wrap it in the exact syntax that specific LLMs expect. Click the single **"Export to LLM"** Dropdown Button to reveal your targets:

*   **Claude (XML)**: Outputs highly structured XML. Critically, it forces a `<chain_of_thought_protocol>` instructing Claude to explicitly: *1. Identify Bun version. 2. Scan package.json for conflicts. 3. Propose a type-safe solution using native Bun APIs.*
*   **GPT-4o (MD)**: Outputs clear Markdown hierarchies, optimized for OpenAI's system role constraints.
*   **Cursor (Agent)**: Targets the Cursor IDE agent directly. It emits `<workspace_context>` tags explicitly forcing the agent to *"Read @package.json and @tsconfig.json before writing code."*

---

## 💎 3. The Vercel AI SDK Suite

Included in the Pro version is an exclusive suite of tools dedicated to the Vercel `ai` package:
*   **Deterministic Zod Schema Generator**: Forces the AI to output literal `z.object()` definitions without surrounding prose, crucial for structured outputs.
*   **Type-Safe Tool-Calling Handler**: Scaffolds `tool()` definitions complete with typed arguments and error boundaries.
*   **Agentic Multi-Step Executor**: Bound operations using `generateText({ maxSteps })` for deterministic autonomous task completion.

---

## 🛠️ 4. Pro Tips for High-Quality Output

> [!IMPORTANT]
> **Deterministic Resolution.** To ensure zero hallucinations, always inject your `package.json` via the Context Injector. The AI will strictly adhere to your installed versions.

> [!TIP]
> **Cursor Integration.** When using the "Copy for Cursor" button, create a new `cursorrules` or Agent context file and paste the copied XML directly into it. The file-path directives embedded by the System Engine will instruct Cursor exactly where to write the solution.

---

## 🛡️ 5. Professional Security Disclosure

Prompt-Flow Pro is built on a **Local-First** privacy architecture. 
- **Offline Processing**: All context parsing happens in your browser's memory. Your code never leaves your machine.
- **Zero Telemetry**: We do not track your project manifests, dependencies, or error logs.
- **Purge Architecture**: Context is volatile and terminates when you close your tab.

👉 **[Read the full Security Disclosure](SECURITY.md)**

---

**Welcome to the future of Deterministic AI-Assisted Engineering.**
