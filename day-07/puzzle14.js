const fs = require('fs')

const code = fs.readFileSync('input.txt', 'utf-8').split(',').map(Number)
// const code = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]

function ACS(ampNumber, amplifiers, phase, input, startingIndex) {
    const code = amplifiers[ampNumber]

    const paramGetter = (paramNumber) => {
        const mode = Number(code[index].toString()[code[index].toString().length-2-paramNumber])
        if (mode) {
            return code[index+paramNumber]
        } else {
            return code[code[index+paramNumber]]
        }
    }

    let index = startingIndex[ampNumber]
    let inputCounter = index !== 0 ? 1 : 0
    let codeOutput = null
    
    while (index <= code.length) {
        switch (code[index] % 100) {
            case 1: {
                // console.log(code[index], '1')
                const numb1 = paramGetter(1)
                const numb2 = paramGetter(2)
                const output = code[index+3]
                code[output] = numb1 + numb2
                index += 4
                break
            }
            case 2: {
                // console.log(code[index], '2')
                const numb1 = paramGetter(1)
                const numb2 = paramGetter(2)
                const output = code[index+3]
                code[output] = numb1 * numb2
                index += 4
                break
            }
            case 3: {
                // console.log(code[index], '3')
                const output = code[index+1]
                code[output] = inputCounter === 0 ? phase : input
                inputCounter++
                index += 2
                break
            }
            case 4: {
                // console.log(code[index], '4')
                const output = code[index+1]
                codeOutput = code[output]
                // console.log('output:', code[output])
                index += 2
                startingIndex[ampNumber] = index
                amplifiers[ampNumber] = [...code]
                return codeOutput
            }
            case 5: {
                // console.log(code[index], '5')
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
                // console.log(code[index], '6')
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
                // console.log(code[index], '7')
                const numb1 = paramGetter(1)
                const numb2 = paramGetter(2)
                code[code[index+3]] = numb1 < numb2 ? 1 : 0
                index += 4
                break
            }
            case 8: {
                // console.log(code[index], '8')
                const numb1 = paramGetter(1)
                const numb2 = paramGetter(2)
                code[code[index+3]] = numb1 == numb2 ? 1 : 0
                index += 4
                break
            }
    
            case 99: {
                // console.log(code[index], 'end')
                return
            }
            default: {
                console.log(code[index], 'baj van')
                return
            }
        }  
    }
}

const phaseSequences = []

for (let i = 12345; i <= 54321; i++) {
    let digits = i.toString().split('').map(Number)
    if (digits[4]*digits[3]*digits[2]*digits[1]*digits[0] === 120 && 
        digits[4]+digits[3]+digits[2]+digits[1]+digits[0] === 15) {
            phaseSequences.push(digits.map(x => x + 4))
    }
}

let maxOutput = 0

phaseSequences.forEach((phaseSequence,i) => {
    console.log(i)
    const amplifiers = [[...code], [...code], [...code], [...code], [...code]]
    const ampStartingIndex = [0,0,0,0,0]
    let input = 0
    let sequenceEnd = false

    while (!sequenceEnd) {
        phaseSequence.forEach( (phase, index) => {
            let output = ACS(index, amplifiers, phase, input, ampStartingIndex)
            if (output) {
                input = output
            } else {
                sequenceEnd = true
            }
        })
    }


    if (input > maxOutput) {
        maxOutput = input
    }
})

console.log('max output:', maxOutput)
