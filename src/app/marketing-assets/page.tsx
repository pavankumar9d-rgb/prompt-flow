import { PromptCard } from "@/components/prompt/PromptCard";
import { getPromptBySlug } from "@/lib/mock-prompts";

export default function MarketingAssetsPage() {
  const prompt = getPromptBySlug("bun-runtime-error-diagnostics");
  
  if (!prompt) return null;

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white p-20 flex flex-col gap-20">
      
      {/* 1. Feature Card (The Prompt Card isolated for a clean screenshot) */}
      <div id="feature-card" className="w-[400px]">
        <PromptCard prompt={prompt} />
      </div>

      {/* 2. Testimonials */}
      <div id="testimonials" className="flex flex-col gap-8 w-[500px]">
        {/* Card 1 */}
        <div id="testimonial-1" className="p-6 rounded-2xl border border-white/[0.06] bg-[#111111] glass flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-white/80 leading-relaxed font-light text-lg">
            "Spent an hour arguing with ChatGPT to stop using fs in Bun. Dropped my package.json into Prompt-Flow and got the exact native implementation instantly."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              SE
            </div>
            <div>
              <p className="font-semibold text-white">Sarah E.</p>
              <p className="text-emerald-400 text-xs font-mono tracking-widest uppercase mt-0.5">Senior Full-Stack Engineer</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div id="testimonial-2" className="p-6 rounded-2xl border border-white/[0.06] bg-[#111111] glass flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-white/80 leading-relaxed font-light text-lg">
            "The Vercel AI SDK prompts alone justify the price. Finally got my streamObject schemas working without the AI throwing random formatting errors."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              ND
            </div>
            <div>
              <p className="font-semibold text-white">Nick D.</p>
              <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mt-0.5">Next.js Developer</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div id="testimonial-3" className="p-6 rounded-2xl border border-white/[0.06] bg-[#111111] glass flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-white/80 leading-relaxed font-light text-lg">
            "It's not just a wrapper. The XML Chain-of-Thought structure actually forces Claude to stop guessing and read my tsconfig paths."
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-600 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              LA
            </div>
            <div>
              <p className="font-semibold text-white">Leo A.</p>
              <p className="text-orange-400 text-xs font-mono tracking-widest uppercase mt-0.5">Lead Architect</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
