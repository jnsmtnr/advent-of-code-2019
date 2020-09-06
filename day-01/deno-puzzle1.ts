const puzzleInput = Deno
  .readTextFileSync("p1.txt")
  .split("\n")
  .filter((el) => el !== "")
  .map(Number);

function fuelCalculator(input: number[]): number {
  return input.reduce((acc, curr) => acc + Math.floor(curr / 3) - 2, 0);
}

console.log(fuelCalculator(puzzleInput));

export {};
