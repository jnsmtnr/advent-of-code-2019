const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number)
input.splice(1,1,12)
input.splice(2,1,2)

for (let i = 0; i < input.length; i += 4) {
    switch (input[i]) {
        case 1: {
            let number1 = input[input[i+1]]
            let number2 = input[input[i+2]]
            let outputIndex = input[i+3]
            input[outputIndex] = number1 + number2
            break
        }

        case 2: {
            let number1 = input[input[i+1]]
            let number2 = input[input[i+2]]
            let outputIndex = input[i+3]
            input[outputIndex] = number1 * number2
            break
        }

        case 99: {
            console.log('input[0]:', input[0])
            return
        }

        default: {
            console.log('baj van')
            break
        }
    }
}