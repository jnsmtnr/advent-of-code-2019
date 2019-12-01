const fs = require('fs')

const input = fs.readFileSync('./p1.txt', 'utf-8').split('\n')

const answer = input.reduce( (acc, current) => {
    console.log(acc)
    if (!current) {
        return acc
    }
    
    result = Math.floor(current / 3) -2
    
    return acc + result
}, 0)

console.log(answer)