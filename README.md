<div align="center">
  <img src="assets/images/hero.png" alt="Prompt-Flow Pro Dashboard" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <h1>🌊 Prompt-Flow Pro</h1>
  <p><strong>The Elite Engineering Intelligence System for Bun.js & Next.js 15</strong></p>

  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Supabase_Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Auth" />
    <img src="https://img.shields.io/badge/Security-Production_Ready-success?style=for-the-badge" alt="Security" />
    <img src="https://img.shields.io/badge/Privacy-Local_Only-blue?style=for-the-badge" alt="Local First" />
  </p>
</div>

---

**Prompt-Flow Pro** is an elite, deterministic engineering layer optimized for modern software delivery. It eliminates the trial-and-error of standard AI tools by wrapping raw prompts in rigorous, model-specific "Chain-of-Thought" structures and automatically injecting multi-file workspace context.

---

## 📊 The "Pro" Evolution

| Feature | Standard AI Usage | Prompt-Flow Pro |
| :--- | :--- | :--- |
| **Output Consistency** | Hallucinations & guesswork | **Deterministic Scoring System (104/104 DET Tests)** |
| **Context Assembly** | Manual copy-pasting | **Drag-and-Drop Multi-File Context Injector** |
| **Model Optimization** | One-size-fits-all prompts | **Claude XML CoT, GPT-4o Markdown, Cursor XML** |
| **Monetization Model** | One-time low-value sale | **Value Ladder: Pro Launch, Enterprise License** |
| **Core Architecture** | Generic prompt storage | **Strict Next.js 15 + Drizzle ORM Engine** |

---

## 🎯 Real-World Impact & Problem Solving

The problem with current AI models is not intelligence—it is **context alignment** and **format compliance**. Developers waste hours coaxing conversational LLMs to use the correct library versions, stop hallucinating Node.js APIs in a Bun environment, or write proper Zod schemas.

**Prompt-Flow Pro solves this by:**
- **Automated Context Parsing:** Automatically stripping `package.json` dependencies and `tsconfig.json` path aliases to feed the LLM the exact constraints of your workspace.
- **Priority Stack Trace Injection:** Ensuring that runtime fixes are hyper-focused on the exact failing line of code.
- **Vercel AI SDK Layer:** Bridging the gap to production by generating deterministic `streamObject` schemas and type-safe `tool()` handlers.

> **Efficiency Gain: ~45 minutes of manual debugging → ~2 minutes of deterministic generation.**

---

## 👨‍💻 Who This Is For

- **Senior Engineers** who require zero-hallucination code generation.
- **Tech Leads & Startups** looking to scaffold full-stack architectures (Drizzle, Elysia, Next.js) reliably.
- **AI Application Builders** needing deterministic tool calling and streaming handlers via the Vercel AI SDK.

---

## 🛠️ Technical Architecture

- **Frontend Design**: A hyper-modern Bento Grid UI featuring a deep charcoal background (`#0A0A0A`) with Emerald Green (`#10B981`) and vibrant gradients. Prompt cards feature a 60fps rotating `conic-gradient` neon ring indicating its Deterministic Score.
- **Interactions**: Built natively with Framer Motion. Hovering over a prompt card gracefully slides down an accordion detailing specific model optimizations.
- **Authentication**: Secured by `@supabase/ssr` running inside Next.js Middleware, shielding protected routes (`/dashboard`, `/settings`) with an iron-clad token verification circuit.
- **Multi-Action Export**: A single sleek dropdown UI button that transpiles context specifically for Claude, GPT, or Cursor agent interfaces.

---

## 🛡️ Security & Privacy

Prompt-Flow Pro is architected with a **Security-First, Local-First** philosophy. We recognize that your source code is your most valuable asset.

### 1. Local Runtime Processing
**Your code never leaves your local runtime.**
Unlike traditional cloud-based AI tools, Prompt-Flow Pro does not transmit your source code, project manifests, or sensitive metadata to any remote server for processing. 
- **Memory-Only Execution**: All project context is processed entirely in your machine's volatile memory (RAM). 
- **Zero-Persistence**: Once your local session is closed, all logic is permanently purged.

### 2. Telemetry & Transparency
- **Optional Telemetry**: We provide an explicit `--no-telemetry` flag in our CLI to disable all external communication natively.
- **Auditable Runtime**: Senior engineers are encouraged to audit our network traffic. Zero bytes of your code are sent outside.

### 3. Secure Authentication
- **HttpOnly Cookies**: Sessions are stored in secure, HttpOnly cookies to prevent XSS-based token theft.
- **Row Level Security (RLS)**: Database connections are locked down. Generic error messaging natively blocks credential enumeration.

---

## 🚀 Getting Started

### 1. Environment Setup
Copy the `.env.example` file to create your local variables:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials to enable the authentication gateway.

### 2. Unified CLI Workflow (Recommended)
Automatically sync your project context with the Pro dashboard securely:
```bash
# Start the Prompt-Flow system without phoning home
bunx prompt-flow --no-telemetry
```

### 3. Manual Installation
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/pavankumar9d-rgb/prompt-flow.git
   cd prompt-flow
   ```
2. **Install Operations:**
   ```bash
   bun install
   ```
3. **Database Push (Drizzle):**
   ```bash
   npx drizzle-kit push
   ```
4. **Run Development Server:**
   ```bash
   npm run dev -p 3005
   ```

---
<div align="center">
  <i>Architected by the Prompt-Flow Engineering Team · Built for elite engineering teams.</i>
</div>
