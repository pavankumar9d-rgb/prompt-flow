import type { InjectedContext } from "./system-engine";

/**
 * cli-provider.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Decodes and sanitizes project context injected via the CLI (URL-encoded).
 */

export function parseCliContext(encoded: string): InjectedContext | null {
  try {
    const raw = Buffer.from(encoded, "base64").toString("utf-8");
    const parsed = JSON.parse(raw);

    const ctx: InjectedContext = {
      packageJson: parsed.packageJson || undefined,
      tsConfig: parsed.tsConfig || undefined,
    };

    return ctx;
  } catch (error) {
    console.error("Failed to parse CLI context:", error);
    return null;
  }
}
