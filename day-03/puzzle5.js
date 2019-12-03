const fs = require('fs')

const [input1, input2] = fs.readFileSync('input.txt', 'utf-8').split('\n')

const wire1 = input1.split(',')
const wire2 = input2.split(',')

const pathFinder = (array) => {
    console.log('pathfinder')
    let position = { x: 0, y: 0 }
    const path = []
    array.forEach( step => {
        let direction = step[0]
        let distance = step.slice(1)
        switch (direction) {
            case 'R': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x + i,
                        y: position.y
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'L': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x - i,
                        y: position.y
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'U': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x,
                        y: position.y + i
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'D': {
                for (let i = 1; i <= distance; i++) {
                    path.push({ x: position.x, y: position.y - i })
                }
                position = path[path.length -1]
                break
            }
        }
    })
    return path
}

const intersectionFinder = (path1, path2) => {
    console.log('intersectionFinder')
    const intersectionPoints = []
    path1.forEach(point1 => {
        path2.forEach(point2 => {
            if (point1.x === point2.x && point1.y === point2.y) {
                intersectionPoints.push(point1)
            }
        })
    })
    return intersectionPoints
}

const minDistanceFinder = (points) => {
    console.log('minDistanceFinder')
    let minDistance = Infinity
    points.forEach( point => {
        let distance = Math.abs(point.x) + Math.abs(point.y)
        if (distance < minDistance) {
            minDistance = distance
        }
    })
    return minDistance
}

console.log(
    minDistanceFinder( intersectionFinder(pathFinder(wire1),pathFinder(wire2)) )
)