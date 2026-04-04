"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-5 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-xl">
      {/* Left: Search trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className={cn(
          "flex items-center gap-2.5 px-3 py-1.5 rounded-lg",
          "bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06]",
          "text-white/30 hover:text-white/50 text-sm transition-all",
          "w-56"
        )}
      >
        <Search size={13} />
        <span className="flex-1 text-left text-[13px]">Search prompts…</span>
        <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded">
          <Command size={9} /> K
        </kbd>
      </button>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <Link
          href="/pricing"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/80 to-indigo-600/80 hover:from-violet-600 hover:to-indigo-600 text-white text-[12px] font-semibold transition-all shadow-lg shadow-violet-900/20"
        >
          <Sparkles size={12} />
          Go Premium
        </Link>
        <Link
          href="/sign-in"
          className="flex items-center px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/60 hover:text-white text-[12px] font-medium transition-all"
        >
          Sign In
        </Link>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
            >
              <div className="mx-4 rounded-2xl bg-[#111113] border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                  <Search size={16} className="text-white/30 shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search prompts, categories, tags…"
                    className="flex-1 bg-transparent text-white placeholder:text-white/25 text-sm outline-none"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={15} />
                  </button>
                </div>
                <div className="p-3">
                  {query.length === 0 && (
                    <p className="text-center text-white/20 text-xs py-6">
                      Start typing to search all prompts…
                    </p>
                  )}
                  {query.length > 0 && (
                    <Link
                      href={`/prompts?q=${encodeURIComponent(query)}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-white/70 text-sm transition-colors"
                    >
                      <Search size={13} className="text-white/30" />
                      Search for &ldquo;<span className="text-violet-400">{query}</span>&rdquo;
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
