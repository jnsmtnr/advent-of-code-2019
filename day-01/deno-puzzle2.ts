const puzzleInput = Deno
  .readTextFileSync("p1.txt")
  .split("\n")
  .filter((el) => el !== "")
  .map(Number);

function fuelCalculator(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function moduleFuelCalculator(mass: number): number {
  const fuel = fuelCalculator(mass);

  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + moduleFuelCalculator(fuel);
  }
}

function totalFuelCalculator(input: number[]): number {
  return input.reduce(
    (totalFuel, module) => totalFuel + moduleFuelCalculator(module),
    0,
  );
}

console.log(totalFuelCalculator(puzzleInput));