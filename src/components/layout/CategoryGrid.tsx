"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Prompt, PromptCategory } from "@/types/prompt";
import { PromptCard } from "@/components/prompt/PromptCard";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  prompts: Prompt[];
  activeCategory?: PromptCategory | "all";
  hasPremiumAccess?: boolean;
  isAuthenticated?: boolean;
  className?: string;
}

export function CategoryGrid({
  prompts,
  activeCategory = "all",
  hasPremiumAccess = false,
  isAuthenticated = false,
  className,
}: CategoryGridProps) {
  // Filter prompts based on category
  const filtered = activeCategory === "all" 
    ? prompts 
    : prompts.filter((p) => p.category === activeCategory);

  return (
    <div className={cn("w-full", className)}>
      {filtered.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/[0.08] rounded-2xl bg-white/[0.02]">
          <p className="text-white/40 text-sm">No prompts found in this category.</p>
        </div>
      ) : (
        <motion.div layout className="bento-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((prompt, i) => (
              <motion.div
                key={prompt.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ 
                  duration: 0.25, 
                  ease: "easeOut",
                  layout: { duration: 0.3, ease: "easeOut" }
                }}
                className={cn(
                  /* For bento grid, make the first two items slightly wider on lg screens */
                  i === 0 || i === 3 ? "lg:col-span-2" : "col-span-1"
                )}
              >
                <PromptCard
                  prompt={prompt}
                  isAuthenticated={isAuthenticated}
                  hasPremiumAccess={hasPremiumAccess}
                  className="h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
