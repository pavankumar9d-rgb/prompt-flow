"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/types/prompt";
import { cn } from "@/lib/utils";

interface PremiumPromptProps {
  prompt: Prompt;
  children: React.ReactNode; // The actual prompt content (will be blurred)
}

export function PremiumPrompt({ prompt, children }: PremiumPromptProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Blurred content */}
      <div
        className="select-none pointer-events-none"
        style={{
          filter: "blur(4px)",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          opacity: 0.4,
        }}
      >
        {children}
      </div>

      {/* Overlay */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center rounded-2xl",
          "bg-gradient-to-b from-[#09090B]/20 to-[#09090B]/90",
          "border border-violet-500/20",
        )}
      >
        {/* Glow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.5 : 0.2, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl bg-gradient-radial from-violet-600/20 to-transparent"
        />

        <div className="relative z-10 text-center px-8">
          <motion.div
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20"
          >
            <Lock size={22} className="text-violet-400" />
          </motion.div>

          <h3 className="text-white font-semibold text-lg mb-2">Premium Prompt</h3>
          <p className="text-white/50 text-sm mb-6 max-w-xs">
            Unlock <span className="text-violet-300">{prompt.title}</span> and all premium prompts
            with a one-time purchase.
          </p>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/pricing"
              className={cn(
                "inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold",
                "bg-gradient-to-r from-violet-600 to-indigo-600",
                "hover:from-violet-500 hover:to-indigo-500",
                "text-white shadow-lg shadow-violet-900/40",
                "transition-all duration-200",
              )}
            >
              <Sparkles size={15} />
              Unlock Premium Access
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
