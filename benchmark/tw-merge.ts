/* eslint-disable no-console */
import { createMerge, tailwind } from "../src/index";

import { benchmark } from "./shared";

async function main() {
  const create = () => createMerge(tailwind(), { cacheSize: 500 });

  console.log("\n\nBenchmarking tw-merge (no cycles on warmup)...\n");
  await benchmark(create, { warmUpTimes: 0 });

  console.log("\n\nBenchmarking tw-merge...\n");
  benchmark(create);
}

main();
