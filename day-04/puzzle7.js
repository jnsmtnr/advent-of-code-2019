startNumber = 108457
endNumber = 562041

const numberTester = (numberString) => {
    let doubleDigit = false

        for (let i = 1; i <= numberString.length -1; i++) {
            if (numberString[i] === numberString[i-1]) {
                doubleDigit = true
            }
            if (Number(numberString[i]) < Number(numberString[i-1])) {
                return false
            }
        }

    return doubleDigit
}

let result = 0

for (let number = startNumber; number <= endNumber; number++) {
    if ( numberTester( number.toString() ) ) {
        result++
    }
}

console.log(result)