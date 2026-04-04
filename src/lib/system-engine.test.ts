import { describe, it, expect } from "vitest";
import { 
  buildSystemPrompt, 
  parsePackageJson, 
  parseTsConfig,
  type InjectedContext 
} from "./system-engine";

describe("System Engine (PromptEngine)", () => {
  
  describe("Parsers", () => {
    it("should parse valid package.json", () => {
      const raw = '{"name": "test", "version": "1.0.0", "dependencies": {"bun": "1.0.0"}}';
      const parsed = parsePackageJson(raw);
      expect(parsed?.name).toBe("test");
      expect(parsed?.dependencies?.bun).toBe("1.0.0");
    });

    it("should parse valid package.json with devDependencies", () => {
      const raw = '{"name": "test", "devDependencies": {"vitest": "1.0.0"}}';
      const parsed = parsePackageJson(raw);
      expect(parsed?.devDependencies?.vitest).toBe("1.0.0");
    });

    it("should return null for invalid package.json", () => {
      expect(parsePackageJson("invalid json")).toBeNull();
    });

    it("should parse valid tsconfig.json and strip comments", () => {
      const raw = `{
        // This is a comment
        "compilerOptions": {
          "paths": { "@/": ["./src/"] }
        }
      }`;
      const parsed = parseTsConfig(raw);
      expect(parsed?.compilerOptions).toBeDefined();
      expect(parsed?.paths?.["@/"]).toContain("./src/");
    });

    it("should return null for invalid tsconfig.json", () => {
      expect(parseTsConfig("!")).toBeNull();
    });
  });

  describe("Formatters - Claude (XML)", () => {
    it("should generate Claude XML with identity and tasks", () => {
      const result = buildSystemPrompt("Fix Bug", "Correct the loop", "claude");
      expect(result).toContain("<system_instruction>");
      expect(result).toContain("<identity>");
      expect(result).toContain("Fix Bug");
      expect(result).toContain("Correct the loop");
    });

    it("should inject workspace context into Claude XML", () => {
      const ctx: InjectedContext = {
        packageJson: { name: "app", version: "1" },
        errorStack: "TypeError: fail"
      };
      const result = buildSystemPrompt("Task", "Content", "claude", ctx);
      expect(result).toContain("<injected_workspace_context>");
      expect(result).toContain("<workspace_package_json>");
      expect(result).toContain("TypeError: fail");
    });

    it("should handle devDependencies in Claude XML", () => {
      const ctx: InjectedContext = {
        packageJson: { name: "app", devDependencies: { "bun": "1" } }
      };
      const result = buildSystemPrompt("T", "C", "claude", ctx);
      expect(result).toContain("devDependencies:");
      expect(result).toContain("bun: 1");
    });
  });

  describe("Formatters - GPT (Markdown)", () => {
    it("should generate GPT Markdown with headers", () => {
      const result = buildSystemPrompt("Feature", "Add auth", "gpt");
      expect(result).toContain("# System Instructions: Feature");
      expect(result).toContain("## Role");
      expect(result).toContain("## Task");
    });

    it("should include workspace context in GPT Markdown", () => {
      const ctx: InjectedContext = { errorStack: "Stack Trace" };
      const result = buildSystemPrompt("T", "C", "gpt", ctx);
      expect(result).toContain("## Workspace Context");
      expect(result).toContain("Stack Trace");
    });
  });

  describe("Formatters - Cursor (Directives)", () => {
    it("should generate Cursor XML with workspace directives", () => {
      const result = buildSystemPrompt("Refactor", "Clean code", "cursor");
      expect(result).toContain("<cursor_instruction>");
      expect(result).toContain("<workspace_context>");
      expect(result).toContain("Read @package.json and @tsconfig.json");
    });

    it("should inject files into Cursor context", () => {
      const ctx: InjectedContext = {
        tsConfig: { compilerOptions: { target: "esnext" } }
      };
      const result = buildSystemPrompt("T", "C", "cursor", ctx);
      expect(result).toContain("<workspace_tsconfig>");
      expect(result).toContain('"target": "esnext"');
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty instruction content gracefully", () => {
      const result = buildSystemPrompt("T", "", "claude");
      expect(result).toContain("<task name=\"T\">");
    });

    it("should escape special characters in XML if necessary (basic check)", () => {
      const result = buildSystemPrompt("T", "Code: <div />", "claude");
      expect(result).toContain("<div />"); 
    });
  });
});
