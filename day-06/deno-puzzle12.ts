function getFullOrbit(
  orbits: Array<Array<string>>,
  start: string,
): Array<Array<string>> {
  const fullOrbit: Array<Array<string>> = [];
  let orbit: string[] | undefined = orbits.find((orbit) => orbit[1] === start);
  while (orbit) {
    fullOrbit.push(orbit);
    orbit = orbits.find((nextorbit) => orbit && nextorbit[1] === orbit[0]);
  }

  return fullOrbit.reverse();
}

function getDiffOfOrbits(
  fullorbit1: Array<Array<string>>,
  fullorbit2: Array<Array<string>>,
): number {
  while (fullorbit1[0] === fullorbit2[0]) {
    fullorbit1.shift();
    fullorbit2.shift();
  }
  return fullorbit1.length - 1 + fullorbit2.length - 1;
}

const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .split("\n")
  .filter(el => el)
  .map(el => el.split(")"));

const orbit1 = getFullOrbit(puzzleInput, "YOU");
const orbit2 = getFullOrbit(puzzleInput, "SAN");

console.log(getDiffOfOrbits(orbit1, orbit2));
