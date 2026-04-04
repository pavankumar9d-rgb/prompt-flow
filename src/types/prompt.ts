// ─── Prompt Types ────────────────────────────────────────────────────────────

export type PromptCategory =
  | "debug"
  | "boilerplate"
  | "logic"
  | "refactoring"
  | "architecture"
  | "testing"
  | "ai-sdk";

/** Target LLM — 'cursor' uses XML + filepath directives for the Cursor IDE agent */
export type LLMTarget = "claude" | "gpt" | "cursor";

export type PromptVersion = "bun" | "nodejs" | "deno";

export interface PromptVariable {
  key: string;        // e.g. "Schema"
  label: string;      // e.g. "Database Schema"
  placeholder: string;
  required: boolean;
}

export interface PromptVersionContent {
  version: PromptVersion;
  label: string;
  systemInstructions: string;
}

/** Per-model optimisation hint shown on card hover */
export interface ModelOptimization {
  claude: string;
  gpt: string;
  cursor: string;
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PromptCategory;
  variables: PromptVariable[];
  versions: PromptVersionContent[];
  tags: string[];
  isPremium: boolean;
  copyCount: number;
  /** 0–100 deterministic confidence score (static, DB-driven). */
  deterministicScore: number;
  /** Per-model optimisation hints for the hover overlay. */
  modelOptimizations: ModelOptimization;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptCardProps {
  prompt: Prompt;
  isAuthenticated?: boolean;
  hasPremiumAccess?: boolean;
  className?: string;
}

export interface CopyButtonProps {
  target: LLMTarget;
  content: string;
  className?: string;
}

export interface VariableInputProps {
  variables: PromptVariable[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export const CATEGORY_META: Record<
  PromptCategory,
  { label: string; color: string; description: string }
> = {
  debug:        { label: "Debugging",    color: "#F87171", description: "Diagnose and fix complex issues" },
  boilerplate:  { label: "Boilerplate",  color: "#60A5FA", description: "Scaffold production-ready code fast" },
  logic:        { label: "Logic",        color: "#34D399", description: "Complex algorithms and data flows" },
  refactoring:  { label: "Refactoring",  color: "#A78BFA", description: "Clean, modernize and optimize code" },
  architecture: { label: "Architecture", color: "#FBBF24", description: "System design and patterns" },
  testing:      { label: "Testing",      color: "#F472B6", description: "Unit, integration, and E2E tests" },
  "ai-sdk":     { label: "Vercel AI SDK", color: "#8B5CF6", description: "Bridge the gap to AI SDK production" },
};
