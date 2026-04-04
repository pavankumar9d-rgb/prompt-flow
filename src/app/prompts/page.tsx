import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CategoryGrid } from "@/components/layout/CategoryGrid";
import { MOCK_PROMPTS } from "@/lib/mock-prompts";
import type { PromptCategory } from "@/types/prompt";

export default async function PromptsPage(props: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryParam = searchParams?.category;
  const query = searchParams?.q?.toLowerCase() ?? "";
  const activeCategory: PromptCategory | "all" =
    (categoryParam as PromptCategory) || "all";

  // Client-side search filter (basic title/tag match)
  const filtered = query
    ? MOCK_PROMPTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    : MOCK_PROMPTS;

  const isAll = (activeCategory as string) === "all";

  const label = isAll
    ? "All Prompts"
    : (activeCategory as string).charAt(0).toUpperCase() + (activeCategory as string).slice(1);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
      <Sidebar activeCategory={activeCategory} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{label} Prompts</h1>
              <p className="text-white/40 text-sm">
                {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} — each backed by a static deterministic score.
              </p>
            </div>

            <CategoryGrid
              prompts={filtered}
              activeCategory={query || isAll ? "all" : activeCategory}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
