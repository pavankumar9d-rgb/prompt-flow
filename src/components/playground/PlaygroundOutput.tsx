"use client";

import { cn } from "@/lib/utils";

interface PlaygroundOutputProps {
  content: string;
  className?: string;
  label?: string;
}

export function PlaygroundOutput({ content, className, label = "Final Output" }: PlaygroundOutputProps) {
  return (
    <div className={cn("flex flex-col h-full bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0D0D10]">
        <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="text-sm font-mono text-white/80 whitespace-pre-wrap leading-relaxed">
          {content || <span className="text-white/20 italic">No output generated yet...</span>}
        </pre>
      </div>
    </div>
  );
}
