"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Bot, Check, FileDown, Loader2, ChevronDown } from "lucide-react";
import { buildSystemPrompt } from "@/lib/system-engine";
import type { InjectedContext } from "@/lib/system-engine";
import type { LLMTarget } from "@/types/prompt";

interface CopyButtonGroupProps {
  promptTitle: string;
  systemInstructions: string;
  variableValues?: Record<string, string>;
  ctx?: InjectedContext;
}

type CopyState = "idle" | "copying" | "success" | "error";

export function CopyButtonGroup({
  promptTitle,
  systemInstructions,
  variableValues = {},
  ctx,
}: CopyButtonGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [activeTarget, setActiveTarget] = useState<LLMTarget | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async (target: LLMTarget) => {
    setActiveTarget(target);
    setCopyState("copying");

    // 1. Interpolate variables into base instructions
    let finalInstructions = systemInstructions;
    for (const [key, value] of Object.entries(variableValues)) {
      finalInstructions = finalInstructions.replaceAll(`[${key}]`, value || "");
    }
    
    // Also strip out any [Variable] tags that weren't inside variableValues at all
    // by matching the systemInstructions format, just to be universally safe.
    finalInstructions = finalInstructions.replace(/\[([A-Z][a-zA-Z0-9]+)\]/g, (match, p1) => {
      // If it looks like a Template Variable and wasn't replaced, sweep it.
      return variableValues[p1] ? match : "";
    });

    // 2. Wrap in target-specific System Engine logic
    let finalPayload = buildSystemPrompt(promptTitle, finalInstructions, target, ctx);

    try {
      await navigator.clipboard.writeText(finalPayload);
      setCopyState("success");
      setTimeout(() => {
        setCopyState("idle");
        setActiveTarget(null);
        setIsOpen(false);
      }, 2000);
    } catch {
      setCopyState("error");
      setTimeout(() => {
        setCopyState("idle");
        setActiveTarget(null);
      }, 2000);
    }
  };

  const getIcon = (target: LLMTarget) => {
    if (activeTarget === target) {
      if (copyState === "copying") return <Loader2 size={16} className="animate-spin text-white/50" />;
      if (copyState === "success") return <Check size={16} className="text-emerald-400" />;
    }
    return <Copy size={16} className="text-white/40" />;
  };

  const options = [
    { id: "claude" as LLMTarget, label: "Claude (XML)", desc: "System Prompt mode with XML tracking", color: "#F97316" }, // Orangeish for Claude
    { id: "gpt" as LLMTarget,    label: "GPT-4o (MD)",  desc: "Hierarchical Markdown structure",      color: "#10B981" }, // Emerald for GPT
    { id: "cursor" as LLMTarget, label: "Cursor (Agent)", desc: "File-aware contextual format",         color: "#8B5CF6" }, // Violet for Cursor
  ];

  return (
    <div className="relative inline-block w-full" ref={menuRef}>
      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full relative flex flex-col items-center justify-center p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="flex items-center gap-2">
          {copyState === "success" ? (
            <Check size={18} className="text-emerald-400" />
          ) : (
            <Copy size={18} className="text-emerald-500" />
          )}
          <span className="font-semibold text-white">
            {copyState === "success" ? "Copied!" : "Export to LLM"}
          </span>
          <ChevronDown size={16} className={`text-white/40 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
        <span className="text-[10px] text-white/40 font-mono mt-1">Select Engine Output Format</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 left-0 right-0 p-2 rounded-xl bg-[#111111] border border-white/[0.08] shadow-2xl backdrop-blur-xl"
            style={{ boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
          >
            <div className="flex flex-col gap-1">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleCopy(opt.id)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors text-left"
                >
                  <div className="mt-0.5 shrink-0">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: opt.color, boxShadow: `0 0 10px ${opt.color}` }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white flex items-center justify-between">
                      {opt.label}
                      {getIcon(opt.id)}
                    </p>
                    <p className="text-[11px] text-white/40 font-mono mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
