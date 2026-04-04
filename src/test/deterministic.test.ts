import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "../lib/system-engine";
import { SCENARIOS } from "../lib/deterministic-data";

/**
 * Deterministic Test Suite
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates the core "Zero Tolerance" engine against 104 unique scenarios.
 * Proof: If this suite passes, the Prompt-Flow Pro system is battle-tested.
 */
describe("Prompt-Flow Pro: 104 Deterministic Scenarios", () => {
  SCENARIOS.forEach((scenario) => {
    it(`[${scenario.id}] ${scenario.description}`, () => {
      const result = buildSystemPrompt(
        scenario.description,
        scenario.codeSnippet,
        "claude", // Test against the most rigorous XML target by default
        scenario.context as any
      );

      // Verify that the generated prompt contains all expected deterministic markers
      scenario.expectedInclusions.forEach((marker) => {
        expect(result).toContain(marker);
      });

      // Verify the Role & Identity are present
      expect(result).toContain("Principal Engineer");
      expect(result).toContain("Bun.js");
      
      // Verify specific CoT (Chain-of-Thought) headers for the category
      if (scenario.category === "runtime") {
        expect(result).toContain("Deterministic Bug Resolution");
      } else {
        expect(result).toContain("AI Code Reviewer");
      }
    });
  });
});
