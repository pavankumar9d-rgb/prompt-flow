import {
  Bug, Code2, Zap, RefreshCw, Building2, TestTube2, Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { PromptCategory } from "@/types/prompt";

export interface CategoryMeta {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
}

export const CATEGORIES: Record<PromptCategory, CategoryMeta> = {
  debug: {
    label: "Debugging",
    icon: Bug,
    color: "#F87171",
    bgColor: "rgba(248,113,113,0.1)",
    description: "Diagnose and fix complex runtime errors",
  },
  boilerplate: {
    label: "Boilerplate",
    icon: Code2,
    color: "#60A5FA",
    bgColor: "rgba(96,165,250,0.1)",
    description: "Scaffold production-ready code instantly",
  },
  logic: {
    label: "Logic",
    icon: Zap,
    color: "#34D399",
    bgColor: "rgba(52,211,153,0.1)",
    description: "Complex algorithms and data flows",
  },
  refactoring: {
    label: "Refactoring",
    icon: RefreshCw,
    color: "#A78BFA",
    bgColor: "rgba(167,139,250,0.1)",
    description: "Clean, modernize and optimize your code",
  },
  architecture: {
    label: "Architecture",
    icon: Building2,
    color: "#FBBF24",
    bgColor: "rgba(251,191,36,0.1)",
    description: "System design patterns and structures",
  },
  testing: {
    label: "Testing",
    icon: TestTube2,
    color: "#F472B6",
    bgColor: "rgba(244,114,182,0.1)",
    description: "Unit, integration, and E2E test generation",
  },
  "ai-sdk": {
    label: "Vercel AI SDK",
    icon: Sparkles,
    color: "#8B5CF6",
    bgColor: "rgba(139,92,246,0.1)",
    description: "Production-ready Vercel AI SDK implementation",
  },
};

export const CATEGORY_ORDER: PromptCategory[] = [
  "debug", "boilerplate", "ai-sdk", "logic", "refactoring", "architecture", "testing",
];
