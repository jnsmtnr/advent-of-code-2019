function intCode(
  originalCode: Array<number>,
  phase: number,
  input: number,
): number {
  const code = [...originalCode];
  let i = 0;
  let firstInput = true;
  while (i < code.length) {
    const opcode = code[i].toString();
    switch (code[i] % 100) {
      case 1: {
        const pos1 = opcode[opcode.length - 3] === "1" ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === "1" ? i + 2 : code[i + 2];
        const resultPos = code[i + 3];
        code[resultPos] = code[pos1] + code[pos2];
        i += 4;
        break;
      }
      case 2: {
        const pos1 = opcode[opcode.length - 3] === "1" ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === "1" ? i + 2 : code[i + 2];
        const resultPos = code[i + 3];
        code[resultPos] = code[pos1] * code[pos2];
        i += 4;
        break;
      }
      case 3: {
        const pos = code[i + 1];
        if (firstInput) {
          code[pos] = phase;
          firstInput = false;
        } else {
          code[pos] = input;
        }
        i += 2;
        break;
      }
      case 4: {
        const outputPos = opcode[opcode.length - 3] === "1"
          ? i + 1
          : code[i + 1];
        return code[outputPos];
      }
      case 5: {
        const ifTruePos = opcode[opcode.length - 3] === "1"
          ? i + 1
          : code[i + 1];
        const jumpToPos = opcode[opcode.length - 4] === "1"
          ? i + 2
          : code[i + 2];
        if (code[ifTruePos]) {
          i = code[jumpToPos];
        } else {
          i += 3;
        }

        break;
      }
      case 6: {
        const ifFalsePos = opcode[opcode.length - 3] === "1"
          ? i + 1
          : code[i + 1];
        const jumpToPos = opcode[opcode.length - 4] === "1"
          ? i + 2
          : code[i + 2];
        if (!code[ifFalsePos]) {
          i = code[jumpToPos];
        } else {
          i += 3;
        }
        break;
      }
      case 7: {
        const pos1 = opcode[opcode.length - 3] === "1" ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === "1" ? i + 2 : code[i + 2];
        const resultPos = opcode[opcode.length - 5] === "1"
          ? i + 3
          : code[i + 3];
        code[resultPos] = code[pos1] < code[pos2] ? 1 : 0;
        i += 4;
        break;
      }
      case 8: {
        const pos1 = opcode[opcode.length - 3] === "1" ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === "1" ? i + 2 : code[i + 2];
        const resultPos = opcode[opcode.length - 5] === "1"
          ? i + 3
          : code[i + 3];
        code[resultPos] = code[pos1] === code[pos2] ? 1 : 0;
        i += 4;
        break;
      }
      case 99: {
        console.log("done");
        break;
      }

      default:
        throw new Error("wrong opcode " + opcode);
    }
  }
  throw new Error("something went terribly wrong");
}

function runPhaseSequence(
  code: Array<number>,
  sequence: Array<number>,
): number {
  let thrustSignal = 0;

  for (let phase of sequence) {
    thrustSignal = intCode(code, phase, thrustSignal);
  }

  return thrustSignal;
}

function generateSequences(): Array<Array<number>> {
  const sequences: Array<Array<number>> = [];

  for (let i = 12345; i <= 54321; i++) {
    const sequence = i.toString().split("").map(Number);
    if (
      sequence[0] + sequence[1] + sequence[2] + sequence[3] + sequence[4] ===
        15 &&
      sequence[0] * sequence[1] * sequence[2] * sequence[3] * sequence[4] ===
        120
    ) {
      sequences.push(sequence.map((phase) => phase - 1));
    }
  }

  return sequences;
}

function findHighestThrust(
  code: Array<number>,
  sequences: Array<Array<number>>,
): number {
  let maxThrust = 0;

  for (let sequence of sequences) {
    console.log(sequence.join());
    const thrust = runPhaseSequence(code, sequence);
    if (thrust > maxThrust) {
      maxThrust = thrust;
    }
  }

  return maxThrust;
}

const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .replace("\n", "")
  .split(",")
  .map(Number);

console.log(findHighestThrust(puzzleInput, generateSequences()));

export {}