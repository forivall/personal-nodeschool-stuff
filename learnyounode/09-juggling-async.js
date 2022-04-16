const http = require('http')
const bl = require('bl')

/**
 * @param {string | http.RequestOptions | import("url").URL} u
 */
function readUrl(u) {
  return new Promise((resolve, reject) => {
    http
      .get(u, (resp) => {
        resp.pipe(
          new bl((err, data) => {
            if (err) return reject(err)
            resolve(data)
          })
        )
      })
      .on('error', reject)
  })
}

main().catch((err) => {
  process.exitCode = 1
  console.error(err)
})
async function main() {
  const promises = process.argv.slice(2).map(readUrl)
  for (const p of promises) {
    console.log((await p).toString('utf8'))
  }
}
