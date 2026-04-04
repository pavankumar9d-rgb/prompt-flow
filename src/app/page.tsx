import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CategoryGrid } from "@/components/layout/CategoryGrid";
import { ProDashboard } from "@/components/layout/ProDashboard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MOCK_PROMPTS } from "@/lib/mock-prompts";

// Show the 6 highest-score prompts as "Featured"
const FEATURED = MOCK_PROMPTS.sort((a, b) => b.deterministicScore - a.deterministicScore).slice(0, 6);

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <main className="flex-1 overflow-y-auto custom-scrollbar">

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <div className="relative pt-24 pb-20 px-8 flex flex-col items-center text-center gradient-hero border-b border-white/[0.04]">
            <div className="scan-lines absolute inset-0 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold uppercase tracking-wider mb-6">
              <Sparkles size={12} />
              Engineering Intelligence System · Pro
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.1]">
              Deterministic AI Engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 text-glow">
                at Zero Tolerance
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-2xl mb-4 leading-relaxed font-light">
              The only prompt library where every output is backed by a{" "}
              <strong className="text-white/70 font-semibold">Deterministic Score</strong>
              {" "}and a{" "}
              <strong className="text-white/70 font-semibold">Chain-of-Thought system instruction</strong>.
              Bun-native. TypeScript strict. Zero Node.js.
            </p>

            {/* Value ladder tier pills */}
            <div className="flex items-center gap-2 mb-10 flex-wrap justify-center">
              {[
                { label: "Pro · $79–$99",     color: "#A78BFA" },
                { label: "Enterprise · $299+", color: "#FBBF24" },
                { label: "Live Feed · $15/mo", color: "#34D399" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full text-[11px] font-mono border"
                  style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/prompts"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors shadow-xl shadow-white/10"
              >
                Browse All Prompts
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/playground"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-colors"
              >
                Try the Playground
              </Link>
            </div>
          </div>

          {/* ── Pro Dashboard (stats + value ladder) ─────────────────────── */}
          <ProDashboard />

          {/* ── Featured Prompts Bento Grid ───────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">Featured Prompts</h2>
                <p className="text-white/40 text-sm">
                  Top-rated by deterministic score — fresh engineering logic, proven outputs.
                </p>
              </div>
              <Link
                href="/prompts"
                className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <CategoryGrid prompts={FEATURED} />
          </div>

        </main>
      </div>
    </div>
  );
}
