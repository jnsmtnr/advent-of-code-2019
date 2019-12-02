const fs = require('fs')

const inputOriginal = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number)

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        const input = [...inputOriginal]
        input[1] = noun
        input[2] = verb

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
                    if (input[0] === 19690720) {
                        console.log(100 * noun + verb)
                        return
                    } else {
                        console.log(noun, verb)
                    }
                    break
                }
        
                default: {
                    break
                }
            }
        }
    }
}

