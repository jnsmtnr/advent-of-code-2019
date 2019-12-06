const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(row =>row.split(')'))

let minCount = Infinity
let prevOrbitings = []

const pathFinder = (orbiting, count) => {
    prevOrbitings.push(orbiting)
    const newOrbiting = input
                        .filter(elem => (elem[0] === orbiting || elem[1] === orbiting))
                        .map(elem => elem[1] === orbiting ? elem[0] : elem[1])
                        .filter(elem => !prevOrbitings.includes(elem))
    if (newOrbiting.includes('SAN')) {
        if (count < minCount) {
            minCount = count
        }
        console.log('santa!', minCount)
        return
    }
    newOrbiting.forEach(elem => {
        if (elem !== 'YOU') {
            pathFinder(elem, count+1)
        }
    })
}

input.forEach(elem=> {
    if (elem[1] === 'YOU') {
        pathFinder(elem[0], 0)
    }
})

console.log(minCount)