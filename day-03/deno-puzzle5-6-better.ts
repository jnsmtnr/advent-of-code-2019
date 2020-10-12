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
  [key: string]: number;
}

interface PathPointsMap {
  [key: string]: PathPoint;
}

function drawPaths(paths: Array<Array<CMD>>): PathPointsMap {
  const map: PathPointsMap = {};

  paths.forEach((path, index) => {
    const actPos = { x: 0, y: 0, wirelength: 0 };
    for (let point of path) {
      for (let i = 1; i <= point.distance; i++) {
        switch (point.direction) {
          case "R":
            actPos.x += 1;
            break;
          case "L":
            actPos.x -= 1;
            break;
          case "U":
            actPos.y += 1;
            break;
          case "D":
            actPos.y -= 1;
            break;

          default:
            throw new Error("Wrong direction input");
        }
        actPos.wirelength++;
        if (
          map[`${actPos.x}/${actPos.y}`] &&
          !map[`${actPos.x}/${actPos.y}`][`wire${index + 1}`]
        ) {
          map[`${actPos.x}/${actPos.y}`][`wire${index + 1}`] =
            actPos.wirelength;
        } else {
          map[`${actPos.x}/${actPos.y}`] = {
            x: actPos.x,
            y: actPos.y,
            [`wire${index + 1}`]: actPos.wirelength,
          };
        }
      }
    }
  });

  return map;
}

function getIntersections(paths: PathPointsMap): Array<PathPoint> {
  const intersections: Array<PathPoint> = [];

  for (let pathpoint in paths) {
    if (paths[pathpoint].wire1 > 0 && paths[pathpoint].wire2 > 0) {
      intersections.push(paths[pathpoint]);
    }
  }

  return intersections;
}

function getClosestIntersectionDistance(
  intersections: Array<PathPoint>,
): Number {
  let minDistance = Infinity;

  for (let intersection of intersections) {
    const distance = Math.abs(intersection.x) + Math.abs(intersection.y);
    if (distance < minDistance) {
      minDistance = distance;
    }
  }

  return minDistance;
}

function getShortestWireIntersectionDistance(
  intersections: Array<PathPoint>,
): Number {
  let minDistance = Infinity;

  for (let intersection of intersections) {
    const distance = intersection["wire1"] + intersection["wire2"];
    if (distance < minDistance) {
      minDistance = distance;
    }
  }

  return minDistance;
}

const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .split("\n");

const wire1 = getWire(puzzleInput[0]);
const wire2 = getWire(puzzleInput[1]);

// for testing:
// const wire1 = getWire("R75,D30,R83,U83,L12,D49,R71,U7,L72");
// const wire2 = getWire("U62,R66,U55,R34,D71,R55,D58,R83");

const paths = drawPaths([wire1, wire2]);

const intersections = getIntersections(paths);

console.log(getClosestIntersectionDistance(intersections));
console.log(getShortestWireIntersectionDistance(intersections));
