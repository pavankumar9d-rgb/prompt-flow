import { describe, it, expect } from "vitest";
import { formatPrompt } from "../lib/formatPrompt";

describe("formatPrompt", () => {
  it("should interpolate variables correctly", () => {
    const template = "Hello [Name]!";
    const result = formatPrompt("Test", template, { Name: "World" }, "gpt");
    expect(result).toContain("Hello World!");
  });

  it("should handle missing variables by keeping the placeholder", () => {
    const template = "Hello [Name]!";
    const result = formatPrompt("Test", template, {}, "gpt");
    expect(result).toContain("Hello [Name]!");
  });

  it("should wrap in XML for Claude format", () => {
    const template = "Instructions";
    const result = formatPrompt("Test", template, {}, "claude");
    expect(result).toContain("<system_instruction>");
    expect(result).toContain("<chain_of_thought_protocol>");
    expect(result).toContain("Instructions");
  });

  it("should wrap in XML for Cursor format", () => {
    const template = "Fix this file";
    const result = formatPrompt("Test", template, {}, "cursor");
    expect(result).toContain("<cursor_instruction>");
    expect(result).toContain("Fix this file");
  });

  it("should wrap in Markdown for GPT format", () => {
    const template = "Optimize this";
    const result = formatPrompt("My Prompt", template, {}, "gpt");
    expect(result).toContain("# System Instructions: My Prompt");
    expect(result).toContain("Bun v1.2+");
  });

  it("should inject package.json context into Claude output", () => {
    const result = formatPrompt("Test", "Do something", {}, "claude", {
      packageJson: { name: "my-app", version: "1.0.0", dependencies: { bun: "1.2.0" } },
    });
    expect(result).toContain("my-app");
    expect(result).toContain("workspace_package_json");
  });
});
