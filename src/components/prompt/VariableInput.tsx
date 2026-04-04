"use client";

import type { PromptVariable } from "@/types/prompt";
import { cn } from "@/lib/utils";

interface VariableInputProps {
  variables: PromptVariable[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  className?: string;
}

export function VariableInput({ variables, values, onChange, className }: VariableInputProps) {
  if (variables.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">
        Variable Inputs
      </p>
      {variables.map((variable) => (
        <div key={variable.key} className="group">
          <label className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs text-violet-400">[{variable.key}]</span>
            <span className="text-xs text-white/50">{variable.label}</span>
            {variable.required && (
              <span className="text-[10px] text-red-400/70 ml-auto">required</span>
            )}
          </label>
          <textarea
            value={values[variable.key] ?? ""}
            onChange={(e) => onChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            rows={3}
            className={cn(
              "w-full resize-none rounded-lg px-3 py-2.5",
              "bg-white/[0.03] border border-white/[0.06]",
              "font-mono text-sm text-white/80 placeholder:text-white/20",
              "focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20",
              "transition-all duration-200",
              "group-hover:border-white/10",
            )}
          />
        </div>
      ))}
    </div>
  );
}
