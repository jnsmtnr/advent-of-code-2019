export type Layer = Array<number>;

export function splitToLayers(
  input: Array<number>,
  imageWidth: number,
  imageHeight: number,
): Array<Layer> {
  const layers: Array<Layer> = [];

  while (input.length > 0) {
    const layer = input.splice(0, imageWidth * imageHeight);
    layers.push(layer);
  }

  return layers;
}

interface Digits {
  "0": number;
  "1": number;
  "2": number;
}

function countDigitsInLayer(layer: Layer): Digits {
  const digits: Digits = {
    "0": 0,
    "1": 0,
    "2": 0,
  };

  for (let digit of layer) {
    digits[digit.toString() as "0" | "1" | "2"]++;
  }

  return digits;
}

function corruptionChecker(
  input: Array<number>,
  imageWidth: number,
  imageHeight: number,
): number {
  let minZerosLayerDigits: Digits = {
    "0": Infinity,
    "1": 0,
    "2": 0,
  };

  const layers = splitToLayers(input, imageWidth, imageHeight);

  for (let layer of layers) {
    const layerDigits = countDigitsInLayer(layer);
    if (layerDigits["0"] < minZerosLayerDigits["0"]) {
      minZerosLayerDigits = layerDigits;
    }
  }

  return minZerosLayerDigits["1"] * minZerosLayerDigits["2"];
}

export const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .replace("\n", "")
  .split("")
  .map(Number);

export const width = 25;
export const height = 6;

if (import.meta.main) {
  console.log(
    corruptionChecker(puzzleInput, width, height)
  )
}