import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("System & Specialty Testing", () => {
  test("Smoke Test: Homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Deterministic Engineering");
  });

  test("Accessibility: Homepage WCAG compliance", async ({ page }) => {
    await page.goto("/");
    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test("SEO: Meta tags verification", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("Prompt-Flow");
    
    const description = await page.getAttribute('meta[name="description"]', "content");
    expect(description).toBeTruthy();
  });

  test("Visual: Homepage UI snapshot", async ({ page }) => {
    await page.goto("/");
    // Wait for animations to settle
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot("homepage-obsidian.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
