const fs = require('fs')

const inputCode = fs.readFileSync('input.txt', 'utf-8').split(',').map(BigInt)
//let inputCode = ['109','1','204','-1','1001','100','1','100','1008','100','16','101','1006','101','0','99'].map(BigInt)

const parameterIndexGetter = (code, i, param, relBase) => {
    const mode = (code[i].toString()[BigInt(code[i].toString().length)-2n-param]) ? BigInt(code[i].toString()[BigInt(code[i].toString().length)-2n-param]) : 0n
    switch (mode) {
        case 0n: {
            return code[i+param]
        }
        case 1n: {
            return i+param
        }
        case 2n: {
            return code[i+param] + relBase
        }
    }
}

const intCodeInterpreter = (code, input) => {
    let index = 0n
    let relativeBase = 0n

    while (index <= code.length) {
        // console.log(index, code[index])
        switch (code[index] % 100n) {
            case 1n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                const outputIndex = parameterIndexGetter(code, index, 3n, relativeBase) || 0n
                code[outputIndex] = number1 + number2
                index += 4n
                break
            }
            case 2n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                const outputIndex = parameterIndexGetter(code, index, 3n, relativeBase) || 0n
                code[outputIndex] = number1 * number2
                index += 4n
                break
            }
            case 3n: {
                const inputIndex = parameterIndexGetter(code, index, 1n, relativeBase) || 0n
                code[inputIndex] = BigInt(input)
                index += 2n
                break
            }
            case 4n: {
                const outputIndex = parameterIndexGetter(code, index, 1n, relativeBase) || 0n
                console.log('4', index, outputIndex, code[outputIndex])
                index += 2n
                break
            }
            case 5n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                if (number1) {
                    index = number2
                } else {
                    index += 3n
                }
                break
            }
            case 6n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                if (!number1) {
                    index = number2
                } else {
                    index += 3n
                }
                break
            }
            case 7n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                const outputIndex = parameterIndexGetter(code, index, 3n, relativeBase) || 0n
                code[outputIndex] = number1 < number2 ? 1n : 0n
                index += 4n
                break
            }
            case 8n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                const number2 = code[parameterIndexGetter(code, index, 2n, relativeBase)] || 0n
                const outputIndex = parameterIndexGetter(code, index, 3n, relativeBase) || 0n
                code[outputIndex] = number1 == number2 ? 1n : 0n
                index += 4n
                break
            }
            case 9n: {
                const number1 = code[parameterIndexGetter(code, index, 1n, relativeBase)] || 0n
                relativeBase += number1
                index += 2n
                break
            }
            case 99n: {
                console.log('end')
                return
            }
            default: {
                console.log('baj van')
                return
            }
        }
    }
}

intCodeInterpreter(inputCode,2n)
