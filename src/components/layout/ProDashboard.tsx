"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Shield, Zap, Package, Crown, Rss,
  ArrowRight, CheckCircle2,
} from "lucide-react";

// ─── Animated stat cards ──────────────────────────────────────────────────────

const STATS = [
  { label: "Deterministic Scenarios",  value: "104",  suffix: "/104", icon: CheckCircle2, color: "#10B981" },
  { label: "Avg. Deterministic Score", value: "94.7", suffix: "/100", icon: Shield,    color: "#34D399" },
  { label: "Engineer Hours Saved",      value: "12K",  suffix: "+",    icon: TrendingUp, color: "#A78BFA" },
  { label: "New Prompts / Month",       value: "5–10", suffix: "",     icon: Zap,        color: "#FBBF24" },
];

// ─── Value ladder tiers ────────────────────────────────────────────────────────

const VALUE_LADDER = [
  {
    id: "pro",
    icon: Package,
    price: "$79–$99",
    label: "Pro Launch",
    tag: "one-time",
    color: "#A78BFA",
    description: "The full Next.js/Bun dashboard as a self-hosted tool. Developers love owning their tools.",
    bullets: [
      "47+ deterministic prompt templates",
      "Multi-file Context Injector",
      "Claude · GPT-4o · Cursor export",
      "Vercel AI SDK prompt suite",
    ],
  },
  {
    id: "enterprise",
    icon: Crown,
    price: "$299+",
    label: "Enterprise License",
    tag: "one-time",
    color: "#FBBF24",
    description: "Includes a pre-configured Drizzle/Elysia boilerplate. Saves a startup's lead engineer 20+ hours of setup.",
    bullets: [
      "Everything in Pro",
      "Drizzle ORM + Elysia boilerplate",
      "JWT + better-auth configuration",
      "Priority Slack support channel",
    ],
    featured: true,
  },
  {
    id: "feed",
    icon: Rss,
    price: "$15/mo",
    label: "Live Intelligence Feed",
    tag: "subscription",
    color: "#34D399",
    description: "5–10 new deterministic prompts every month as Bun.js and the Vercel AI SDK evolve.",
    bullets: [
      "Monthly prompt drops",
      "Bun + AI SDK version-aligned",
      "Early access to new categories",
      "Cancel anytime",
    ],
  },
];

export function ProDashboard() {
  return (
    <section className="max-w-6xl mx-auto px-8 pt-16 pb-4 space-y-16">

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="relative flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm overflow-hidden"
              >
                {/* Background glow */}
                <div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20"
                  style={{ backgroundColor: stat.color }}
                />
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white font-mono tabular-nums">
                    {stat.value}
                    <span className="text-sm font-normal text-white/40 ml-1">{stat.suffix}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Value Ladder ────────────────────────────────────────────────── */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">The Value Ladder</h2>
          <p className="text-white/40 text-sm max-w-xl">
            Move beyond a one-time sale. Three tiers designed to scale revenue with your customers&apos; success.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {VALUE_LADDER.map((tier) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative flex flex-col rounded-2xl border overflow-hidden"
                style={{
                  borderColor: tier.featured ? `${tier.color}40` : "rgba(255,255,255,0.06)",
                  background: tier.featured
                    ? `linear-gradient(145deg, ${tier.color}08 0%, rgba(255,255,255,0.02) 100%)`
                    : "rgba(255,255,255,0.025)",
                  boxShadow: tier.featured ? `0 0 40px ${tier.color}15` : "none",
                }}
              >
                {tier.featured && (
                  <div
                    className="absolute top-0 inset-x-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.color}80, transparent)` }}
                  />
                )}

                <div className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}15`, color: tier.color }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase"
                      style={{ color: tier.color, borderColor: `${tier.color}30`, backgroundColor: `${tier.color}10` }}
                    >
                      {tier.tag}
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-white font-mono mb-0.5">{tier.price}</p>
                  <p className="text-sm font-semibold text-white/80 mb-3">{tier.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed mb-5">{tier.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 size={12} style={{ color: tier.color }} className="mt-0.5 shrink-0" />
                        <span className="text-[11px] text-white/60">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-5">
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: tier.featured ? tier.color : `${tier.color}15`,
                      color: tier.featured ? "#000" : tier.color,
                    }}
                  >
                    Get {tier.label}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── System Trust Center ────────────────────────────────────────── */}
      <div className="relative p-8 rounded-3xl border border-[#10B981]/20 bg-[#10B981]/[0.02] overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[10px] font-mono uppercase tracking-tighter">
            <CheckCircle2 size={10} />
            Live Build: Verified v1.2.0
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">System Trust Center</h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Every prompt in our library is validated against our <strong>Deterministic Test Suite</strong>. 
              We track 104 unique failure scenarios across Bun runtime, Next.js hydration, and TS compilation.
            </p>
            <div className="mt-6 flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold text-[#10B981] font-mono tabular-nums">104/104</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Scenarios Passing</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white font-mono tabular-nums">100%</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Bug-Free Engine</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-2xl border border-white/[0.05] p-5 font-mono text-[11px] space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[PASS]</span>
              <span className="text-white/70">RT-001: Bun SQLite native module path</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[PASS]</span>
              <span className="text-white/70">RT-002: Next.js 15 Hydration mismatch</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span>[PASS]</span>
              <span className="text-white/70">AR-001: Component bloating detection</span>
            </div>
            <div className="flex items-center gap-2 text-white/20">
              <span>... 101 more scenarios verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
