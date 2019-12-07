const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number)

let index = 0

const paramGetter = (paramNumber) => {
    const mode = Number(input[index].toString()[input[index].toString().length-2-paramNumber])
    if (mode) {
        return input[index+paramNumber]
    } else {
        return input[input[index+paramNumber]]
    }
}

while (index <= input.length) {
    switch (input[index] % 100) {
        case 1: {
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            const output = input[index+3]
            input[output] = numb1 + numb2
            index += 4
            break
        }
        case 2: {
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            const output = input[index+3]
            input[output] = numb1 * numb2
            index += 4
            break
        }
        case 3: {
            const output = input[index+1]
            input[output] = 1
            index += 2
            break
        }
        case 4: {
            const output = input[index+1]
            console.log(input[output])
            index += 2
            break
        }
        case 99: {
            console.log('end')
            return
        }
        default: {
            console.log('baj van')
            return
        }
    }  
} 

