function orbitCounter(orbits: Array<[string, string]>, i: number): number {
  if (orbits[i][0] === 'COM') {
    return 1
  } else {
    return 1 + orbitCounter(orbits, orbits.findIndex(el => el[1] === orbits[i][0]))
  }
}

const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .split("\n")
  .filter(el => el)
  .map(el => el.split(")"));

const result = puzzleInput.reduce((acc, _, index) => {
  return acc + orbitCounter(puzzleInput as Array<[string, string]>, index)
}, 0)

console.log(result) 

export {}