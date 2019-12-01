const fs = require('fs')

const input = fs.readFileSync('./p1.txt', 'utf-8').split('\n')

function calcFuel(mass) {
    return Math.floor(mass / 3) - 2
}

function calcTotalFuel(mass) {
    let fuel = calcFuel(mass)
    if (fuel > 0) {
        return fuel + calcTotalFuel(fuel)
    } else {
        return 0
    }
}

const answer = input.reduce((acc, current) => {
    if (!current) {
        return acc
    } else {
        return acc + calcTotalFuel(current)
    }
}, 0)

console.log(answer)