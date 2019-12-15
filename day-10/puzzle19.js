const fs = require('fs')

const puzzleInput = fs.readFileSync('input.txt', 'utf-8').split('\n').filter(row => row.length > 0).map(row => row.split(''))

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
                continue
            } else {
                if ( input[y][x] === '#' ) {
                    if ( (x2-x1)*(y-y1) == (y2-y1)*(x-x1) ) {
                        return false
                    }
                }
            }
        }
    }
    return true
}

const countLoFs = (input) => {
    let maxCount = 0
    let point = {}
    for (let y1 = 0; y1 < input.length; y1++) {
        for (let x1 = 0; x1 < input[y1].length; x1++) {
            if (input[y1][x1] == '#') {
                let count = 0
                for (let y2 = 0; y2 < input.length; y2++) {
                    for (let x2 = 0; x2 < input[y2].length; x2++) {
                        if (x1 == x2 && y1 == y2 ) {
                            continue
                        } else if (input[y2][x2] == '#') {
                            if (testLof(input, x1, y1, x2, y2))
                                count++
                        }
                    }
                }
                if (count > maxCount) {
                    maxCount = count
                    point = { x: x1, y: y1 }
                }
            }
        }
    }
    console.log(maxCount, point)
}

countLoFs(puzzleInput)