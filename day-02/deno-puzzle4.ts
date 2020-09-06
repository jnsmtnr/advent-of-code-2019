const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .replace("\n", "")
  .split(",")
  .map(Number);

function intcode(originalInput: number[], noun: number, verb: number) {
  const input = [...originalInput];
  input[1] = noun;
  input[2] = verb;
  let i = 0;
  while (i < input.length) {
    switch (input[i]) {
      case 1:
        input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
        i += 4;
        break;
      case 2:
        input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
        i += 4;
        break;
      case 99:
        console.log("done", input[0]);
        return input[0];
      default:
        console.log("baj van");
        return;
    }
  }
}

function calcGravityAssist(input: number[]) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (intcode(input, noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

console.log(calcGravityAssist(puzzleInput));

export {};
