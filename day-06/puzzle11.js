const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(row =>row.split(')'))

const orbitCounter = (orbit) => {
    const nextOrbit = input.find(elem => elem[1] === orbit[0])
    if (nextOrbit) {
        return 1 + orbitCounter(nextOrbit)
    } else {
        return 1
    }
}

console.log(input.reduce( (acc, elem) => {
    if (elem.length < 2) {
        return acc
    }
    return acc + orbitCounter(elem)
}, 0))
