const http = require('http')
const bl = require('bl')

const onerr = (err) => {
  process.exitCode = 1;
  console.error(err)
}
http.get(process.argv[2], (resp) => {
  resp.pipe(new bl((err, data) => {
    if (err) return onerr(err)

    console.log(data.length)
    console.log(data.toString('utf8'))
  }))
}).on('error', onerr)
