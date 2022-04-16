const fs = require('fs')
const stream = require('stream')

let n = 0
/**
 * @param {string} chunk
 */
function count(chunk) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk.charCodeAt(i) === 10) {
      n++
    }
  }
}
count(fs.readFileSync(process.argv[2], 'utf8'))
console.log(n)
