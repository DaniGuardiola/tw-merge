/* eslint-disable no-console */
import { extendTailwindMerge } from "tailwind-merge";

import { benchmark } from "./shared";

async function main() {
  const create = () => extendTailwindMerge({ cacheSize: 500 });

  console.log("\n\nBenchmarking tailwind-merge (no cycles on warmup)...\n");
  await benchmark(create, { warmUpTimes: 0 });

  console.log("\n\nBenchmarking tailwind-merge...\n");
  benchmark(create);
}

main();
