function intCode(originalCode: Array<number>, input?: any): void {
  const code = [...originalCode];
  let i = 0;
  while (i < code.length) {
    const opcode = code[i].toString();
    switch (code[i] % 100) {
      case 1: {
        const pos1 = opcode[opcode.length - 3] === '1' ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === '1' ? i + 2 : code[i + 2];
        const resultPos = code[i + 3];
        code[resultPos] = code[pos1] + code[pos2]
        i += 4;
        break;
      }
      case 2: {
        const pos1 = opcode[opcode.length - 3] === '1' ? i + 1 : code[i + 1];
        const pos2 = opcode[opcode.length - 4] === '1' ? i + 2 : code[i + 2];
        const resultPos = code[i + 3];
        code[resultPos] = code[pos1] * code[pos2]
        i += 4;
        break;
      }
      case 3: {
        const pos = code[i + 1];
        code[pos] = input;
        i += 2;
        break;
      }
      case 4: {
        const outputPos = opcode[opcode.length - 3] === '1' ? i + 1 : code[i + 1];
        console.log(code[outputPos]);
        i += 2;
        break;
      }
      case 99: {
        console.log("done");
        return;
      }

      default:
        throw new Error("wrong opcode");
    }
  }
}

const puzzlecode = Deno
  .readTextFileSync("input.txt")
  .replace("\n", "")
  .split(",")
  .map(Number);

intCode(puzzlecode, 1);

export {}