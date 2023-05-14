/* eslint-disable no-console */
import inputs from "./_generated/inputs.json";

function bench(fn: () => void) {
  const start = Date.now();
  fn();
  const end = Date.now();
  return end - start;
}

function run(merge: (input: string) => string, times: number) {
  while (times > 0) {
    inputs.forEach((input) => merge(input));
    times--;
  }
}

function wait(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function benchmark(
  createMerge: () => (input: string) => string,
  {
    warmUpTimes = 100000,
    times = 1000000,
  }: { times?: number; warmUpTimes?: number } = {}
) {
  // create merge
  let merge: ReturnType<typeof createMerge>;
  const creationTime = bench(() => {
    merge = createMerge();
  });
  console.log(`\nCreation time: ${creationTime} ms`);

  // first call time
  const firstCallTime = bench(() => {
    merge("");
  });
  console.log(`\nFirst call time: ${firstCallTime} ms`);

  // warm up
  console.log("\nWarming up...");
  await wait();
  run(merge!, warmUpTimes);
  await wait();

  // run
  console.log(
    `\nThe merge function will be tested ${times} times with ${
      inputs.length
    } inputs for a total of ${times * inputs.length} function calls.\n`
  );
  console.log("Running benchmark...");
  const time = bench(() => run(merge, times));
  console.log(`\nTotal time: ${time} ms`);
}
