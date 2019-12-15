const testInput = 
`.#..#
.....
#####
....#
...##
`.split('\n').map(row => row.split(''))
testInput.pop()

console.log(testInput)

// for (let y = 0; y < testInput.length; y++) {
//     for (let x = 0; x < testInput[y].length; x++) {
//         console.log(x, y, testInput[y][x])
//     }
// }

const testLof = (input, x1, y1, x2, y2) => {
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <=x2; x++) {
            if (x == x1 && y == y1) {
                console.log('kezdőpont')
            } else if (x == x2 && y == y2) {
                console.log('végpont')
                return true
            } else {
                if ( input[y][x] === '#' ) {
                    if ( (x2-x1)*(y-y1) == (y2-y1)*(x-x1) ) {
                        return false
                    }
                }
            }
        }
    }
}

console.log( testLof(testInput, 1, 0, 4, 4) )