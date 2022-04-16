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
fs.readFile(process.argv[2], 'utf8', (err, data) => {
  if (err) {
    process.exitCode = 1;
    return;
  }
  count(data)
  console.log(n)
})
function streaming() {
  fs.createReadStream(process.argv[2], 'utf8').pipe(
    new stream.Writable({
      defaultEncoding: 'utf8',
      write(chunk, encoding, done) {
        count(chunk)
        done()
      },
      final(done) {
        console.log(n)
        done()
      }
    })
  )
}
