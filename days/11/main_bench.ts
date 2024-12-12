import { count, fasterCount, parseProgram } from "./main.ts";

const txtInput = Deno.readTextFileSync(
  new URL("input.txt", import.meta.url),
);

const stones = parseProgram(txtInput);

Deno.bench("count", () => {
  count(stones, 25);
});

Deno.bench("fasterCount", () => {
  fasterCount(stones, 25);
});
