const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .replace("\n", "")
  .split(",")
  .map(Number);

function intcode(input: number[]) {
  let i = 0;
  while (i < input.length) {
    console.log(input[i]);
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
        return;
      default:
        console.log("baj van");
        return;
    }
  }
}

puzzleInput[1] = 12;
puzzleInput[2] = 2;

intcode(puzzleInput);
