interface Config {
  code: Array<number>;
  i: number;
  phase: number;
  done: boolean;
  firstInput: boolean;
}

function intCode(
  input: number,
  config: Config,
): number | void {
  while (config.i < config.code.length) {
    const opcode = config.code[config.i].toString();
    switch (config.code[config.i] % 100) {
      case 1: {
        const pos1 = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const pos2 = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        const resultPos = config.code[config.i + 3];
        config.code[resultPos] = config.code[pos1] + config.code[pos2];
        config.i += 4;
        break;
      }
      case 2: {
        const pos1 = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const pos2 = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        const resultPos = config.code[config.i + 3];
        config.code[resultPos] = config.code[pos1] * config.code[pos2];
        config.i += 4;
        break;
      }
      case 3: {
        const pos = config.code[config.i + 1];
        if (config.firstInput) {
          config.code[pos] = config.phase;
          config.firstInput = false;
        } else {
          config.code[pos] = input;
        }
        config.i += 2;
        break;
      }
      case 4: {
        const outputPos = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        config.i += 2;
        return config.code[outputPos];
      }
      case 5: {
        const ifTruePos = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const jumpToPos = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        if (config.code[ifTruePos]) {
          config.i = config.code[jumpToPos];
        } else {
          config.i += 3;
        }

        break;
      }
      case 6: {
        const ifFalsePos = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const jumpToPos = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        if (!config.code[ifFalsePos]) {
          config.i = config.code[jumpToPos];
        } else {
          config.i += 3;
        }
        break;
      }
      case 7: {
        const pos1 = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const pos2 = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        const resultPos = opcode[opcode.length - 5] === "1"
          ? config.i + 3
          : config.code[config.i + 3];
        config.code[resultPos] = config.code[pos1] < config.code[pos2] ? 1 : 0;
        config.i += 4;
        break;
      }
      case 8: {
        const pos1 = opcode[opcode.length - 3] === "1"
          ? config.i + 1
          : config.code[config.i + 1];
        const pos2 = opcode[opcode.length - 4] === "1"
          ? config.i + 2
          : config.code[config.i + 2];
        const resultPos = opcode[opcode.length - 5] === "1"
          ? config.i + 3
          : config.code[config.i + 3];
        config.code[resultPos] = config.code[pos1] === config.code[pos2]
          ? 1
          : 0;
        config.i += 4;
        break;
      }
      case 99: {
        config.done = true;
        return;
      }

      default:
        throw new Error("wrong opcode " + opcode);
    }
  }
  throw new Error("something went terribly wrong");
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
      sequences.push(sequence.map((phase) => phase + 4));
    }
  }

  return sequences;
}

function runPhaseSequence(
  originalCode: Array<number>,
  sequence: Array<number>,
): number {
  const configs: Array<Config> = sequence.map((phase) => {
    return {
      code: [...originalCode],
      i: 0,
      phase,
      done: false,
      firstInput: true,
    };
  });
  let thrustSignal = 0;

  while (!configs[4].done) {
    for (let config of configs) {
      const output = intCode(thrustSignal, config);
      if (output) {
        thrustSignal = output;
      }
    }
  }

  return thrustSignal;
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

console.log(
  findHighestThrust(puzzleInput, generateSequences()),
);
