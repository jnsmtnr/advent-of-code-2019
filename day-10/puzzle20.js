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

const fs = require('fs')

const puzzleInput = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(row => row.length > 0).map(row => row.split(''))


const laserPosition = { x: 11, y: 11 }

const aimAtAsteroid = (laserPos, asteroidPos) => {
    const toDeg = (rad) => rad * 180 / Math.PI

    let bearing = toDeg(Math.atan( (asteroidPos.x - laserPos.x) / -(asteroidPos.y - laserPos.y) ))
    const deltaX = asteroidPos.x - laserPos.x
    const deltaY = asteroidPos.y - laserPos.y
    const range = Math.sqrt(deltaX*deltaX + deltaY*deltaY)

    if (deltaX > 0 && deltaY > 0) {
        bearing += 180
    } else if (deltaX < 0 && deltaY > 0) {
        bearing += 180
    } else if (deltaX < 0 && deltaY < 0) {
        bearing += 360
    } else if (deltaX === 0 && deltaY < 0) {
        bearing = 0
    } else if (deltaX === 0 && deltaY > 0) {
        bearing = 180
    } else if (deltaX > 0 && deltaY === 0) {
        bearing = 90
    } else if (deltaX < 0 && deltaY === 0) {
        bearing = 270
    }

    return {
        bearing,
        range,
        x: asteroidPos.x,
        y: asteroidPos.y
    }
}

const getAllAsteroid = (input, laserPos) => {
    const bearings = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (x === laserPos.x && y === laserPos.y) {
                continue
            } else if ( input[y][x] === '#' ){
                bearings.push(aimAtAsteroid(laserPos, {x, y}))
            }
        }
    }
    return bearings
}

// const allAsteroid = getAllAsteroid(input, laserPosition)
const allAsteroid = getAllAsteroid(puzzleInput, laserPosition)
let allBearing = []

allAsteroid.forEach(asteroid => {
    if (!allBearing.includes(asteroid.bearing)) {
        allBearing.push(asteroid.bearing)
    }
})

allBearing = allBearing.sort((a,b) => a - b)

const fireAtBearing = (asteroids, bearing) => {
    const asteroidsAtBearing = asteroids.filter(x => x.bearing === bearing).sort((a,b) => a.range - b.range)

    if (asteroidsAtBearing.length === 0) {
        return 'no asteroid at bearing ' + bearing
    }

    const target = {
        x: asteroidsAtBearing[0].x,
        y: asteroidsAtBearing[0].y
    }

    const indexOfAsteroid = asteroids.findIndex(ast => ast.x === asteroidsAtBearing[0].x && ast.y === asteroidsAtBearing[0].y)

    asteroids.splice(indexOfAsteroid, 1)

    return target
}

console.log(fireAtBearing(allAsteroid, allBearing[0]))
console.log(fireAtBearing(allAsteroid, allBearing[1]))
console.log(fireAtBearing(allAsteroid, allBearing[2]))
console.log(fireAtBearing(allAsteroid, allBearing[9]))
console.log(fireAtBearing(allAsteroid, allBearing[19]))
console.log(fireAtBearing(allAsteroid, allBearing[199]))