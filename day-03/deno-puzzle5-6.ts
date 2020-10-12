const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .split("\n");

interface CMD {
  direction: string;
  distance: number;
}

function getWire(input: string): Array<CMD> {
  return input
    .split(",")
    .map((cmd) => {
      return {
        direction: cmd[0],
        distance: Number(cmd.slice(1)),
      };
    });
}

interface PathPoint {
  x: number;
  y: number;
  wireLength: number;
}

function drawPath(wire: Array<CMD>): Array<PathPoint> {
  console.log('drawing path...');
  const path: Array<PathPoint> = [];
  const actPos = { x: 0, y: 0, wireLength: 0 };

  wire.forEach((cmd) => {
    for (let i = 1; i <= cmd.distance; i++) {
      actPos.wireLength++;
      switch (cmd.direction) {
        case "R":
          actPos.x += 1;
          path.push({ ...actPos });
          break;

        case "L":
          actPos.x -= 1;
          path.push({ ...actPos });
          break;

        case "U":
          actPos.y += 1;
          path.push({ ...actPos });
          break;
        case "D":
          actPos.y -= 1;
          path.push({ ...actPos });
          break;

        default:
          throw new Error("Wrong direction!");
      }
    }
  });

  return path;
}

interface IntersectionPoint extends PathPoint {
  totalWireLength: number;
}

function getIntersections(
  path1: Array<PathPoint>,
  path2: Array<PathPoint>,
): Array<IntersectionPoint> {
  console.log('getting intersections...')
  const intersections: Array<IntersectionPoint> = [];

  path1.forEach((point1, index) => {
    console.log(`${index+1}/${path1.length}`)
    path2.forEach((point2) => {
      if (point1.x === point2.x && point1.y === point2.y) {
        intersections.push({
          ...point1,
          totalWireLength: point1.wireLength + point2.wireLength
        });
      }
    });
  });

  return intersections;
}

// for the puzzle day 3 part 1
function getClosestPointDistance(points: Array<IntersectionPoint>): Number {
  console.log("checking closest points...")
  let minDistance = Infinity;

  points.forEach((point, index) => {
    console.log(`${index+1}/${points.length}`)
    const distance = Math.abs(point.x) + Math.abs(point.y);
    if (distance < minDistance) {
      minDistance = distance;
    }
  });

  return minDistance;
}

function getShortestWiresDistance(points: Array<IntersectionPoint>): Number {
  console.log("checking for shortest wires...")
  let minDistance = Infinity;

  points.forEach((point, index) => {
    console.log(`${index+1}/${points.length}`)
    const distance = point.totalWireLength;
    if (distance < minDistance) {
      minDistance = distance;
    }
  });

  return minDistance;
}

const wire1 = getWire(puzzleInput[0]);
const wire2 = getWire(puzzleInput[1]);

// const wire1 = getWire("R75,D30,R83,U83,L12,D49,R71,U7,L72");
// const wire2 = getWire("U62,R66,U55,R34,D71,R55,D58,R83");

const path1 = drawPath(wire1);
const path2 = drawPath(wire2);

const intersections = getIntersections(path1, path2);

console.log(intersections);

// console.log(getClosestPointDistance(intersections));
console.log(getShortestWiresDistance(intersections));

export {}