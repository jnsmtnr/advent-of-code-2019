const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf-8').split('').filter(elem => /[0-9]/.test(elem)).map(Number)

const width = 25
const height = 6
const pixelsInLayer = width * height

const layers = []

while (input.length > 0) {
    layers.push(input.splice(0,pixelsInLayer))
}

let minNumberOf0s = Infinity
let layerIndex = null

layers.forEach( (layer, index) => {
    const numberOf0s = layer.filter(pixel => pixel === 0).length
    if (numberOf0s < minNumberOf0s) {
        minNumberOf0s = numberOf0s
        layerIndex = index
    }
})

const numberOf1s = layers[layerIndex].filter(pixel => pixel === 1).length
const numberOf2s = layers[layerIndex].filter(pixel => pixel === 2).length

console.log(numberOf1s * numberOf2s)