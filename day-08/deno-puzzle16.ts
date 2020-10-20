import {
  height,
  Layer,
  puzzleInput,
  splitToLayers,
  width,
} from "./deno-puzzle15.ts";

function imageRenderer(
  input: Array<number>,
  imageWidth: number,
  imageHeight: number,
): void {
  const finalLayer: Layer = [];

  const layers = splitToLayers(input, imageWidth, imageHeight);

  for (let i = 0; i < imageWidth * imageHeight; i++) {
    for (let layer of layers) {
      if (layer[i] !== 2) {
        finalLayer.push(layer[i]);
        break;
      }
    }
  }

  while (finalLayer.length > 0) {
    console.log(
      finalLayer.splice(0, imageWidth).join("").replace(/0/g, " ").replace(/1/g, "█"),
    );
  }
}

imageRenderer(puzzleInput, width, height);
