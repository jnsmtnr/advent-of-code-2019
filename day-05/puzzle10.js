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
            console.log(input[index], '1')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            const output = input[index+3]
            input[output] = numb1 + numb2
            index += 4
            break
        }
        case 2: {
            console.log(input[index], '2')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            const output = input[index+3]
            input[output] = numb1 * numb2
            index += 4
            break
        }
        case 3: {
            console.log(input[index], '3')
            const output = input[index+1]
            input[output] = 5
            index += 2
            break
        }
        case 4: {
            console.log(input[index], '4')
            const output = input[index+1]
            console.log(input[output])
            index += 2
            break
        }
        case 5: {
            console.log(input[index], '5')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            if (numb1) {
                index = numb2
            } else {
                index += 3
            }
            break
        }
        case 6: {
            console.log(input[index], '6')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            if (!numb1) {
                index = numb2
            } else {
                index += 3
            }
            break
        }
        case 7: {
            console.log(input[index], '7')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            input[input[index+3]] = numb1 < numb2 ? 1 : 0
            index += 4
            break
        }
        case 8: {
            console.log(input[index], '8')
            const numb1 = paramGetter(1)
            const numb2 = paramGetter(2)
            input[input[index+3]] = numb1 == numb2 ? 1 : 0
            index += 4
            break
        }

        case 99: {
            console.log(input[index], 'end')
            return
        }
        default: {
            console.log(input[index], 'baj van')
            return
        }
    }  
} 
console.log('he?')
