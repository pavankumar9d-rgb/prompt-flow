"use client";

import { motion } from "framer-motion";
import type { PromptVersionContent, PromptVersion } from "@/types/prompt";
import { cn } from "@/lib/utils";

interface VersionTabsProps {
  versions: PromptVersionContent[];
  activeVersion: PromptVersion;
  onChange: (version: PromptVersion) => void;
  className?: string;
}

export function VersionTabs({ versions, activeVersion, onChange, className }: VersionTabsProps) {
  if (versions.length <= 1) return null;

  return (
    <div className={cn("flex items-center gap-1 p-1 bg-white/[0.02] border border-white/[0.04] rounded-xl overflow-hidden", className)}>
      {versions.map((v) => {
        const isActive = activeVersion === v.version;
        return (
          <button
            key={v.version}
            onClick={() => onChange(v.version)}
            className={cn(
              "relative px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors",
              isActive ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="version-tab"
                className="absolute inset-0 bg-white/[0.08] rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}
