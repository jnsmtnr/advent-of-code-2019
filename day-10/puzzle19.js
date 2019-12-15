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
    const xMin = Math.min(x1,x2)
    const xMax = Math.max(x1,x2)

    const yMin = Math.min(y1,y2)
    const yMax = Math.max(y1,y2)
    
    for (let y = yMin; y <= yMax; y++) {
        for (let x = xMin; x <= xMax; x++) {
            if (x == x1 && y == y1) {
                continue
            } else if (x == x2 && y == y2) {
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

console.log( testLof(testInput, 0, 4, 4, 4) )