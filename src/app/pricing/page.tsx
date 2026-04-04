"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState<"starter" | "pro">("starter");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-6xl mx-auto pb-24">
            
            {/* Header */}
            <div className="text-center mt-12 mb-20 max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Premium Engineering Intelligence
              </h1>
              <p className="text-lg text-white/50 leading-relaxed">
                Start with guaranteed deterministic logic, then upgrade to full 
                project architecture automation when you&apos;re ready.
              </p>
            </div>

            {/* Pricing Cards (Bento) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
            >
              {/* Starter */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 glass ${activePlan === "starter" ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.05)]" : "border-white/[0.06] bg-[#111111]"}`}
              >
                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/[0.08] bg-white/[0.03] text-white/60 uppercase tracking-widest mb-6 inline-block">
                    Free
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white tracking-tight">₹0</span>
                  </div>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">
                    Essential features for debugging runtime failures with deterministic AI logic.
                  </p>
                </div>
                <button
                  onClick={() => setActivePlan("starter")}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${activePlan === "starter" ? "bg-white/[0.05] text-white/40 cursor-default" : "bg-white text-black hover:bg-white/90"}`}
                >
                  {activePlan === "starter" ? "Current Plan" : "Downgrade"}
                </button>
              </motion.div>

              {/* Pro */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 glass ${activePlan === "pro" ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.05)]" : "border-white/[0.06] bg-[#111111]"}`}
              >
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
                    Most Popular
                  </span>
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 uppercase tracking-widest mb-6 inline-block">
                    One-time
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white tracking-tight">₹999</span>
                  </div>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">
                    Full Next.js/Bun dashboard. Advanced context injection and AI SDK prompt generation.
                  </p>
                </div>
                <button
                  onClick={() => setActivePlan("pro")}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${activePlan === "pro" ? "bg-white/[0.05] text-white/40 cursor-default" : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"}`}
                >
                  {activePlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                </button>
              </motion.div>

              {/* Live Intelligence Feed (Faked Subscription) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative flex flex-col p-8 rounded-3xl border border-white/[0.06] bg-[#111111] glass group"
              >
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border border-violet-500/50 bg-violet-500/10 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-md">
                    Early Access
                  </span>
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-violet-500/20 bg-violet-500/10 text-violet-400 uppercase tracking-widest mb-6 inline-block">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Live Intelligence Feed</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white tracking-tight">₹499</span>
                    <span className="text-sm text-white/40 mb-1">/month</span>
                  </div>
                  <p className="text-sm text-white/40 mb-4 leading-relaxed">
                    Get 5–10 new deterministic prompts every month
                  </p>
                  <p className="text-sm text-white/40 mb-8 leading-relaxed">
                    Stay aligned with latest AI + SDK updates
                  </p>
                </div>
                
                {/* Disabled Button + Tooltip */}
                <div className="relative">
                  <button
                    disabled
                    className="w-full py-3 rounded-xl text-sm font-bold bg-white/[0.03] border border-white/[0.05] text-white/30 cursor-not-allowed transition-all"
                  >
                    Coming Soon
                  </button>
                  {/* Tooltip on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute bottom-full mb-3 px-3 py-2 bg-white text-black text-[11px] font-semibold rounded-lg shadow-xl w-[220px] text-center">
                      Subscription launches after initial product release
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-solid border-t-white border-t-[6px] border-x-transparent border-x-[6px] border-b-0" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Feature Comparison Table */}
            <div className="border border-white/[0.06] rounded-3xl overflow-hidden glass bg-[#111111]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-[#0A0A0A]">
                      <th className="p-6 text-sm font-mono text-white/60 tracking-widest uppercase font-medium w-2/5">Features</th>
                      <th className="p-6 text-sm font-mono text-white/60 tracking-widest uppercase font-medium text-center w-1/5">Starter</th>
                      <th className="p-6 text-sm font-mono text-emerald-400 tracking-widest uppercase font-medium text-center w-1/5">Pro</th>
                      <th className="p-6 text-sm font-mono text-violet-400 tracking-widest uppercase font-medium text-center w-1/5">Subscription</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-white/[0.06] hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 text-white/80">Prompt Library Access</td>
                      <td className="p-6 text-center text-white/40">Basic</td>
                      <td className="p-6 text-center text-emerald-400 font-medium">Full Access</td>
                      <td className="p-6 text-center text-violet-400 font-medium">Full Access</td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 text-white/80">Context Injector</td>
                      <td className="p-6 text-center text-white/40">Limited</td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-emerald-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-violet-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 text-white/80">AI SDK Layer</td>
                      <td className="p-6 text-center flex justify-center"><X className="text-white/20 w-5 h-5 mx-auto" /></td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-emerald-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-violet-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                    </tr>
                    <tr className="border-b border-white/[0.06] hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 text-white/80">Monthly New Prompts</td>
                      <td className="p-6 text-center flex justify-center"><X className="text-white/20 w-5 h-5 mx-auto" /></td>
                      <td className="p-6 text-center flex justify-center"><X className="text-white/20 w-5 h-5 mx-auto" /></td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-violet-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                    </tr>
                    <tr className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-6 text-white/80">Priority Updates</td>
                      <td className="p-6 text-center flex justify-center"><X className="text-white/20 w-5 h-5 mx-auto" /></td>
                      <td className="p-6 text-center flex justify-center"><X className="text-white/20 w-5 h-5 mx-auto" /></td>
                      <td className="p-6 text-center flex justify-center"><CheckCircle2 className="text-violet-400 w-5 h-5 mx-auto" strokeWidth={2.5} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
