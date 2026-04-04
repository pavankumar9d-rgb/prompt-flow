"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Eye, Zap, Shield, Crown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Prompt } from "@/types/prompt";

interface PromptCardProps {
  prompt: Prompt;
  isAuthenticated?: boolean;
  hasPremiumAccess?: boolean;
  className?: string;
}

export function PromptCard({ 
  prompt, 
  isAuthenticated = false, 
  hasPremiumAccess = false,
  className = ""
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Modern Style: Emerald-green neon ring for deterministic score
  const ringGradient = `conic-gradient(from 0deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(16, 185, 129, 1) 100%)`;

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden glass transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
    >
      {/* Premium Gradient Top Border */}
      {prompt.isPremium && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FBBF24]/50 to-transparent" />
      )}
      {!prompt.isPremium && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      {/* ── Header Area ──────────────────────────────────────────────────────── */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono tracking-widest uppercase border border-white/[0.05] bg-white/[0.02] text-white/60 flex items-center gap-1.5">
              {prompt.category === "debug" && <Zap size={10} className="text-rose-400" />}
              {prompt.category}
            </span>
            {prompt.isPremium && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase border border-[#FBBF24]/30 bg-[#FBBF24]/10 text-[#FBBF24] flex items-center gap-1">
                <Crown size={10} /> PRO
              </span>
            )}
          </div>

          {/* Neon-Green Conic Gradient Score Badge */}
          <div className="relative group/score flex flex-col items-center justify-center w-12 h-12 shrink-0">
            {/* The rotating conic gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ background: ringGradient }}
            />
            {/* Inner mask to create the ring effect */}
            <div className="absolute inset-[2px] rounded-full bg-[#0A0A0A] flex flex-col items-center justify-center shadow-inner">
              <span className="text-sm font-bold font-mono text-emerald-400 leading-none">
                {prompt.deterministicScore}
              </span>
              <span className="text-[7.5px] font-mono tracking-widest text-emerald-500/70 mt-0.5">
                DET
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-emerald-50 transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
          {prompt.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-white/[0.03] text-white/40 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-white/[0.03] text-white/40 text-xs font-mono">
              +{prompt.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* ── Slide Down Optimizations Panel (Hover) ───────────────────────────── */}
      <AnimatePresence>
        {isHovered && prompt.modelOptimizations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
            className="overflow-hidden bg-[#111111] border-t border-white/[0.04]"
          >
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-1.5 mb-1 text-emerald-400/80">
                <Shield size={12} />
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                  Model Optimizations
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] mt-1 shrink-0" />
                  <p className="text-xs text-white/60 leading-snug"><span className="text-white/80 font-medium">Claude:</span> {prompt.modelOptimizations.claude}</p>
                </div>
                {/* For space reasons on smaller cards, optionally hide GPT or Cursor if it's too long, but let's show Cursor */}
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6] mt-1 shrink-0" />
                  <p className="text-xs text-white/60 leading-snug"><span className="text-white/80 font-medium">Cursor:</span> {prompt.modelOptimizations.cursor}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="p-4 border-t border-white/[0.04] bg-[#0A0A0A] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Copy size={12} />
            <span className="font-mono">{prompt.copyCount} copies</span>
          </div>
          <span className="text-xs text-white/30 font-mono hidden sm:inline">
            Updated{" "}
            {prompt.updatedAt.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/prompts/${prompt.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors text-sm font-medium"
          >
            <Eye size={14} />
            View
          </Link>
          
          {prompt.isPremium ? (
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 hover:bg-[#FBBF24]/20 transition-colors text-sm font-semibold"
            >
              <Crown size={14} />
              Unlock
            </Link>
          ) : (
             <Link
              href={`/prompts/${prompt.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-sm font-semibold"
            >
              <Copy size={14} />
              Open
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
