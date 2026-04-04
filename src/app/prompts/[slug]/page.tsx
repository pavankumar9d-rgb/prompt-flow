"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PremiumPrompt } from "@/components/prompt/PremiumPrompt";
import { VariableInput } from "@/components/prompt/VariableInput";
import { CopyButtonGroup } from "@/components/prompt/CopyButton";
import { VersionTabs } from "@/components/prompt/VersionTabs";
import { ContextInjector } from "@/components/prompt/ContextInjector";
import { useSearchParams } from "next/navigation";
import { parseCliContext } from "@/lib/cli-provider";
import { useEffect } from "react";
import { ChevronRight, Shield, Terminal } from "lucide-react";
import Link from "next/link";
import type { Prompt, PromptVersion } from "@/types/prompt";
import type { InjectedContext } from "@/lib/system-engine";

// ─── Score colour helper (mirrors PromptCard) ─────────────────────────────────
function scoreColor(score: number) {
  if (score >= 95) return { neon: "#34D399", ring: "rgba(52,211,153,0.3)" };
  if (score >= 85) return { neon: "#60A5FA", ring: "rgba(96,165,250,0.3)" };
  if (score >= 70) return { neon: "#FBBF24", ring: "rgba(251,191,36,0.3)" };
  return { neon: "#F87171", ring: "rgba(248,113,113,0.3)" };
}

// ─── Mock prompt (production would be fetched by slug from DB) ────────────────
const MOCK_PROMPT: Prompt = {
  id: "1",
  slug: "bun-runtime-error-diagnostics",
  title: "Bun Runtime Error Diagnostics",
  description:
    "Systematically diagnose and fix runtime errors in Bun.js applications using structured stack trace analysis and native Bun APIs.",
  category: "debug",
  tags: ["bun", "debugging", "runtime", "typescript"],
  isPremium: false,
  copyCount: 342,
  deterministicScore: 96,
  modelOptimizations: {
    claude: "XML CoT forces root-cause analysis before any code suggestion — eliminates speculative fixes.",
    gpt:    "Markdown chain-of-thought instructs GPT-4o to reference the injected error stack first.",
    cursor: "Cursor XML targets the exact failing file line from the stack trace for surgical edits.",
  },
  createdAt: new Date("2025-10-01"),
  updatedAt: new Date("2026-03-28"),
  variables: [
    { key: "ErrorMessage", label: "Error Message",  placeholder: "Paste the full error stack trace here",          required: true  },
    { key: "CodeContext",  label: "Code Context",   placeholder: "Paste the relevant code block (10–30 lines)",     required: true  },
  ],
  versions: [
    {
      version: "bun",
      label: "Bun (Modern)",
      systemInstructions: `You are an expert Bun.js runtime engineer. Your task is to diagnose and fix the following error:

Error:
\`\`\`
[ErrorMessage]
\`\`\`

Code Context:
\`\`\`typescript
[CodeContext]
\`\`\`

Analyze the error, state the root cause, and provide a corrected modern Bun/TypeScript solution using only native Bun APIs.`,
    },
    {
      version: "nodejs",
      label: "Node.js (Legacy)",
      systemInstructions: `You are an expert Node.js engineer. Diagnose the following error:

Error: [ErrorMessage]
Code: [CodeContext]`,
    },
  ],
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PromptDetailPage() {
  const prompt = MOCK_PROMPT;
  const hasPremiumAccess = false;

  const [activeVersion, setActiveVersion] = useState<PromptVersion>(
    prompt.versions[0].version
  );
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [injectedCtx, setInjectedCtx] = useState<InjectedContext>({});

  const activeInstructions =
    prompt.versions.find((v) => v.version === activeVersion)?.systemInstructions ?? "";

  const handleVariableChange = useCallback((key: string, val: string) => {
    setVariableValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleContextChange = useCallback((ctx: InjectedContext) => {
    setInjectedCtx(ctx);
    // Auto-inject error stack into the ErrorMessage variable if present
    if (ctx.errorStack && prompt.variables.some((v) => v.key === "ErrorMessage")) {
      setVariableValues((prev) => ({ ...prev, ErrorMessage: ctx.errorStack! }));
    }
  }, [prompt.variables]);

  // Handle CLI Context URL Injection
  const searchParams = useSearchParams();
  useEffect(() => {
    const cliData = searchParams.get("cli_context");
    if (cliData) {
      const parsed = parseCliContext(cliData);
      if (parsed) {
        setInjectedCtx(parsed);
      }
    }
  }, [searchParams]);

  const score = scoreColor(prompt.deterministicScore);

  const ContentArea = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: System Instructions */}
      <div className="lg:col-span-7 flex flex-col bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#0D0D10]/50">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
            System Instructions
          </span>
          <VersionTabs
            versions={prompt.versions}
            activeVersion={activeVersion}
            onChange={setActiveVersion}
          />
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <pre className="text-[13px] font-mono text-violet-100/80 whitespace-pre-wrap leading-loose">
            {activeInstructions.split(/(\[[a-zA-Z]+\])/).map((part, i) => {
              if (part.startsWith("[") && part.endsWith("]")) {
                const key = part.slice(1, -1);
                const val = variableValues[key];
                return (
                  <span
                    key={i}
                    className={
                      val
                        ? "text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded"
                        : "text-violet-400 font-bold bg-violet-400/10 px-1 py-0.5 rounded"
                    }
                  >
                    {val || part}
                  </span>
                );
              }
              return part;
            })}
          </pre>
        </div>
      </div>

      {/* Right: Variables, Context & Copy */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Variables */}
        <div className="p-5 bg-[#111113] border border-white/[0.06] rounded-2xl">
          <VariableInput
            variables={prompt.variables}
            values={variableValues}
            onChange={handleVariableChange}
          />
        </div>

        {/* Context Injector — Pro feature */}
        <div className="p-5 bg-[#111113] border border-white/[0.06] rounded-2xl">
          <p className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-widest mb-3">
            Multi-File Workspace Context
          </p>
          <ContextInjector 
            onContextChange={handleContextChange} 
            injectedContext={injectedCtx}
          />
        </div>

        {/* Export */}
        <div className="p-5 bg-[#111113] border border-white/[0.06] rounded-2xl">
          <p className="text-[10px] font-mono font-semibold text-white/30 uppercase tracking-widest mb-3">
            Export Format
          </p>
          <CopyButtonGroup
            promptTitle={prompt.title}
            systemInstructions={activeInstructions}
            variableValues={variableValues}
            ctx={injectedCtx}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-mono text-white/30 mb-6">
              <Link href="/prompts" className="hover:text-white/60 transition-colors">
                Prompts
              </Link>
              <ChevronRight size={12} />
              <Link
                href={`/prompts?category=${prompt.category}`}
                className="text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest"
              >
                {prompt.category}
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/60">{prompt.title}</span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">{prompt.title}</h1>
                <p className="text-white/50 text-base max-w-3xl leading-relaxed">
                  {prompt.description}
                </p>
              </div>

              {/* Deterministic Score Badge */}
              <div
                className="shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border"
                style={{
                  borderColor: score.ring,
                  backgroundColor: `${score.neon}08`,
                }}
              >
                <Shield size={14} style={{ color: score.neon }} />
                <span
                  className="text-2xl font-bold font-mono tabular-nums leading-none"
                  style={{ color: score.neon }}
                >
                  {prompt.deterministicScore}
                </span>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  DET score
                </span>
              </div>
            </div>

            {/* Main Interface */}
            {prompt.isPremium && !hasPremiumAccess ? (
              <PremiumPrompt prompt={prompt}>
                <ContentArea />
              </PremiumPrompt>
            ) : (
              <ContentArea />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
