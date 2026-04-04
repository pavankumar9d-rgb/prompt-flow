#!/usr/bin/env bun
/**
 * prompt-flow-cli
 * ─────────────────────────────────────────────────────────────────────────────
 * The professional bridge between your local project and the Prompt-Flow Pro
 * dashboard. Scans, filters, and injects context with zero friction.
 *
 * Usage: bunx prompt-flow [-u <url>]
 */

import { exec } from "child_process";
import fs from "fs";
import path from "path";

const VERSION = "1.0.0";
const DEFAULT_PORTS = [3000, 3001, 5173, 8080, 8081];

async function main() {
  const args = process.argv.slice(2);
  let dashboardUrl = "";

  // 1. Parse Args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-u" || args[i] === "--url" || args[i] === "--dashboard-url") {
      dashboardUrl = args[i + 1];
      break;
    }
  }

  console.log(`\n🌊 Prompt-Flow Pro CLI v${VERSION}`);
  console.log(`───────────────────────────────────────`);

  // 2. Auto-Detect Dashboard Port if not provided
  if (!dashboardUrl) {
    console.log("[?] No dashboard URL provided. Auto-detecting local instance...");
    for (const port of DEFAULT_PORTS) {
      const url = `http://localhost:${port}`;
      try {
        const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(500) });
        if (res.ok) {
          dashboardUrl = url;
          console.log(`[+] Found active dashboard at: ${dashboardUrl}`);
          break;
        }
      } catch {
        // Port closed, continue scanning
      }
    }
  }

  // Fallback to default if detection fails
  if (!dashboardUrl) {
    dashboardUrl = "http://localhost:3000";
    console.log(`[!] Auto-detection failed. Falling back to default: ${dashboardUrl}`);
  }

  // 3. Read & Filter Context
  let packageJson: any = null;
  let tsConfig: any = null;

  try {
    const pkgPath = path.join(process.cwd(), "package.json");
    if (fs.existsSync(pkgPath)) {
      const raw = fs.readFileSync(pkgPath, "utf-8");
      const sizeKb = Buffer.byteLength(raw) / 1024;
      
      packageJson = JSON.parse(raw);

      if (sizeKb > 20) {
        console.log(`[!] package.json is large (${sizeKb.toFixed(1)}KB). Truncating devDependencies to optimize AI context...`);
        // Smart Filter: Keep root metadata + production deps + engines
        packageJson = {
          name: packageJson.name,
          version: packageJson.version,
          engines: packageJson.engines,
          dependencies: packageJson.dependencies,
          // Explicitly strip devDependencies
        };
      }
    }
  } catch (e) {
    console.error("[!] Error reading package.json:", (e as Error).message);
  }

  try {
    const tsPath = path.join(process.cwd(), "tsconfig.json");
    if (fs.existsSync(tsPath)) {
      const raw = fs.readFileSync(tsPath, "utf-8");
      // Naive strip comments for JSON parsing
      const clean = raw.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
      tsConfig = JSON.parse(clean);
    }
  } catch (e) {
    // tsconfig optional
  }

  if (!packageJson && !tsConfig) {
    console.error("[!] No project manifest found in current directory. Aborting.");
    process.exit(1);
  }

  // 4. Encode & Launch
  const payload = JSON.stringify({ packageJson, tsConfig });
  const encoded = Buffer.from(payload).toString("base64url");
  
  const finalUrl = `${dashboardUrl}/?cli_context=${encoded}`;
  
  console.log(`[+] Injecting context into dashboard...`);
  
  const startCmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
  exec(`${startCmd} "${finalUrl}"`);

  console.log(`[✓] Done. Your dashboard should launch automatically.\n`);
}

main().catch((err) => {
  console.error("\n[X] Fatal CLI Error:", err.message);
  process.exit(1);
});
