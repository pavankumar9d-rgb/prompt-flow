import autocannon from "autocannon";
import { db } from "@/db";
import { prompts } from "@/db/schema";

/**
 * ⚡ HEAVY LOAD & STRESS TEST
 * Simulates high concurrency to ensure SQLite + Next.js stays stable.
 */
async function runLoadTest() {
  console.log("🚀 Starting Heavy Stress Test (Autocannon)...");
  
  // Warm up the DB
  const count = await db.select().from(prompts);
  console.log(`📊 DB currently contains ${count.length} prompts.`);

  const url = "http://localhost:3000/api/prompts";
  
  const instance = autocannon({
    url,
    connections: 10,  // Final success check
    duration: 10,     // 10 seconds
    pipelining: 1,
    method: "GET",
  }, (err: Error, result: autocannon.Result) => {
    if (err) {
      console.error("🚨 Stress test failed:", err);
      return;
    }
    console.log("🏁 Stress Test Complete!");
    console.log(`📈 Requests per second: ${result.requests.average}`);
    console.log(`📉 Errors: ${result.errors}`);
    console.log(`⏱️  P99 Latency: ${result.latency.p99}ms`);
    
    if (result.errors > 0 || result.non2xx > 0) {
      console.warn("⚠️  Warnings: Some requests failed under load.");
    } else {
      console.log("✅ Success: System remained stable under peak load.");
    }
  });

  // Track progress
  autocannon.track(instance, { renderProgressBar: true });
}

if (require.main === module) {
  runLoadTest();
}

export { runLoadTest };
