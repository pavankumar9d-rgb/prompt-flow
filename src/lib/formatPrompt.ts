import type { LLMTarget } from "@/types/prompt";
import { buildSystemPrompt, type InjectedContext } from "@/lib/system-engine";

/**
 * Format a prompt's system instructions for a specific LLM target.
 *  1. Interpolates all [Variable] placeholders with provided values.
 *  2. Passes the interpolated content through the system-engine builder
 *     which wraps it in the correct Claude XML / GPT Markdown / Cursor XML structure.
 *  3. Optionally prepends injected workspace context (package.json, tsconfig, error stack).
 */
export function formatPrompt(
  title: string,
  systemInstructions: string,
  variables: Record<string, string>,
  target: LLMTarget,
  ctx: InjectedContext = {}
): string {
  // Interpolate [VariableName] placeholders
  let interpolated = systemInstructions;
  for (const [key, value] of Object.entries(variables)) {
    interpolated = interpolated.replaceAll(`[${key}]`, value || `[${key}]`);
  }

  return buildSystemPrompt(title, interpolated, target, ctx);
}
