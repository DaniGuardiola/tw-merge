/* eslint-disable no-console */
import { extendTailwindMerge } from "tailwind-merge";

import { benchmark } from "./shared";

console.log("\n\nBenchmarking tailwind-merge (no cache)...\n");

const create = () => extendTailwindMerge({ cacheSize: 0 });
benchmark(create, { warmUpTimes: 100, times: 1000 });
