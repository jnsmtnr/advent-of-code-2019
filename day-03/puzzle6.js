const fs = require('fs')

const [input1, input2] = fs.readFileSync('input.txt', 'utf-8').split('\n')

const wire1 = input1.split(',')
const wire2 = input2.split(',')

// const wire1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51']
// const wire2 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']

const pathFinder = (array) => {
    console.log('pathfinder')
    let position = { x: 0, y: 0, step: 0 }
    const path = []
    array.forEach( step => {
        let direction = step[0]
        let distance = step.slice(1)
        switch (direction) {
            case 'R': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x + i,
                        y: position.y,
                        step: position.step + i
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'L': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x - i,
                        y: position.y,
                        step: position.step + i
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'U': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x,
                        y: position.y + i,
                        step: position.step + i
                    })
                }
                position = path[path.length -1]
                break
            }
            case 'D': {
                for (let i = 1; i <= distance; i++) {
                    path.push({
                        x: position.x,
                        y: position.y - i,
                        step: position.step + i
                    })
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
                intersectionPoints.push(point1.step + point2.step)
            }
        })
    })
    return intersectionPoints
}

const minStepFinder = (points) => {
    console.log('minStepFinder')
    let minStep = Infinity
    points.forEach( step => {
        if (step < minStep) {
            minStep = step
        }
    })
    return minStep
}

console.log(
    minStepFinder( intersectionFinder(pathFinder(wire1),pathFinder(wire2)) )
)