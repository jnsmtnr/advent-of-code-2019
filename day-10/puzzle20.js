const input = `
.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`.split('\n').filter(row => row.length > 0).map(row => row.split(''))

const laserPosition = { x: 11, y: 13 }

const steepnessArrayCalc = (input, origo) => {
    steepnessArray = []
    for (let y = 0; y < origo.y; y++) {
        for (let x = origo.x; x < input[y].length; x++) {
            if (x == origo.x && y == origo.y) {
                continue
            } else if (input[y][x] == '#') {
                let steepness = (y - origo.y)/(x - origo.x)
                if (!steepnessArray.includes(steepness)) {
                    steepnessArray.push(steepness)
                }
            }
        }
    }
    return steepnessArray.sort((a,b) => a - b)
}

const laserBeam = (input, laserX, laserY, m) => {
    let nearestTarget = { range: Infinity }
        
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (x == laserX && y == laserY) {
                continue
            } else if ( input[y][x] === '#' ) {
                if ( ((m == Infinity || m == -Infinity) && x == laserX ) || y == m*x + (laserY - m*laserX)) {               
                    let range = Math.abs(x-laserX) + Math.abs(y-laserY)
                    if (range <= nearestTarget.range) {
                        nearestTarget = {
                            x,
                            y,
                            range
                        }
                    }
                }
            }
        }
    }
    return nearestTarget
}

const steepness = steepnessArrayCalc(input, laserPosition)

console.log(steepness[0], steepness[1], steepness[2], steepness[9])

console.log(laserBeam(input, laserPosition.x, laserPosition.y, steepness[0]))
console.log(laserBeam(input, laserPosition.x, laserPosition.y, steepness[1]))
console.log(laserBeam(input, laserPosition.x, laserPosition.y, steepness[2]))
console.log(laserBeam(input, laserPosition.x, laserPosition.y, steepness[9]))

// console.log(steepnessArrayCalc(input, laserPosition))

// console.log(laserBeam(input, laserPosition.x, laserPosition.y, 12, 1))