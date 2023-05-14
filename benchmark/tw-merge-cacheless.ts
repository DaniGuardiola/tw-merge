/* eslint-disable no-console */
import { createMerge, tailwind } from "../src/index";

import { benchmark } from "./shared";

console.log("\n\nBenchmarking tw-merge (no cache)...\n");

const create = () => createMerge(tailwind(), { cacheSize: 0 });
benchmark(create, { warmUpTimes: 100, times: 1000 });
