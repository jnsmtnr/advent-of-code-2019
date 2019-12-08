const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split('').filter(elem => /[0-9]/.test(elem)).map(Number)

const width = 25
const height = 6
const pixelsInLayer = width * height

const layers = []

while (input.length > 0) {
    layers.push(input.splice(0,pixelsInLayer))
}

const finalImage = []

for (let i = 0; i < pixelsInLayer; i++) {
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
        if (layers[layerIndex][i] !== 2) {
            finalImage.push(layers[layerIndex][i])
            break
        }
    }
}

const render = finalImage.map( pixel => pixel === 0 ? ' ' : '#')

while (render.length > 0) {
    console.log(render.splice(0,width).join(''))
}