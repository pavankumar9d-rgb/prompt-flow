"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Zap, LayoutGrid, ChevronRight, Flame,
} from "lucide-react";
import { CATEGORIES, CATEGORY_ORDER } from "@/lib/categories";
import type { PromptCategory } from "@/types/prompt";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeCategory?: PromptCategory | "all";
  onCategoryChange?: (cat: PromptCategory | "all") => void;
}

export function Sidebar({ activeCategory = "all", onCategoryChange }: SidebarProps) {
  const router = useRouter();

  const handleClick = (cat: PromptCategory | "all") => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      const url = cat === "all" ? "/prompts" : `/prompts?category=${cat}`;
      router.push(url);
    }
  };

  return (
    <aside className="flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-white/[0.06] bg-[#09090B] pt-4 pb-6 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 mb-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40 pulse-glow">
            <Zap size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[13.5px] text-white tracking-tight leading-none mb-1">
              Prompt<span className="text-violet-400">Flow</span>
            </span>
            <span className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em] leading-none">
              Engineering Intelligence
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {/* All prompts */}
        <SidebarItem
          label="All Prompts"
          icon={<LayoutGrid size={14} />}
          isActive={activeCategory === "all"}
          onClick={() => handleClick("all")}
          count={null}
          color="#FAFAFA"
        />

        {/* Featured */}
        <SidebarItem
          label="Popular"
          icon={<Flame size={14} />}
          isActive={false}
          onClick={() => router.push("/prompts?sort=popular")}
          count={null}
          color="#F97316"
        />

        <div className="pt-4 pb-1.5 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20">
            Categories
          </p>
        </div>

        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORIES[cat];
          const Icon = meta.icon;
          return (
            <SidebarItem
              key={cat}
              label={meta.label}
              icon={<Icon size={14} />}
              isActive={activeCategory === cat}
              onClick={() => handleClick(cat)}
              count={null}
              color={meta.color}
            />
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="px-3 mt-4">
        <div className="rounded-xl bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/15 p-3.5">
          <p className="text-xs font-semibold text-white/80 mb-0.5">Unlock Premium</p>
          <p className="text-[11px] text-white/40 mb-3">Get all 50+ pro prompts + updates.</p>
          <Link
            href="/pricing"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-semibold transition-colors"
          >
            Upgrade
            <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────
function SidebarItem({
  label, icon, isActive, onClick, color,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  count: number | null;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group text-left",
        isActive
          ? "sidebar-item-active"
          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent"
      )}
    >
      {/* Active indicator pill */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: `${color}15`, borderColor: `${color}25` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <span
        className="relative z-10 transition-colors"
        style={{ color: isActive ? color : undefined }}
      >
        {icon}
      </span>
      <span className={cn(
        "relative z-10 text-[13px] font-medium transition-colors",
        isActive ? "text-white" : ""
      )}>
        {label}
      </span>
    </button>
  );
}
