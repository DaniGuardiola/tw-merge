import * as fs from "fs";
import * as path from "path";

const docsFiles = fs
  .readdirSync(path.join(__dirname, "../docs"))
  .map((file) => path.join("docs", file));
const testFiles = fs
  .readdirSync(path.join(__dirname, "../tests"))
  .map((file) => path.join("tests", file));
const files = [...docsFiles, ...testFiles];

const twMergeInputRegex = /twMerge\("(?<input>.*)"/g;

const inputs = files
  .map((file) => {
    const fileContent = fs.readFileSync(path.join(__dirname, `../${file}`), {
      encoding: "utf-8",
    });
    return Array.from(fileContent.matchAll(twMergeInputRegex)).map(
      (match) => match.groups!.input
    );
  })
  .flat();

const allClasses = inputs.map((input) => input.split(" ")).flat();

const randomInputs = Array.from({ length: 200 }, () => {
  const classes = Array.from({ length: 10 }, () => {
    const index = Math.floor(Math.random() * allClasses.length);
    return allClasses[index];
  });
  return classes.join(" ");
});

fs.writeFileSync(
  path.join(__dirname, "../benchmark/_generated/inputs.json"),
  JSON.stringify([...inputs, ...randomInputs], null, 2)
);
