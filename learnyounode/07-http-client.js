const http = require('http')

const onerr = (err) => {
  process.exitCode = 1;
  console.error(err)
}
http.get(process.argv[2], (resp) => {
  resp.setEncoding('utf8')
  resp.on('data', (chunk) => {
    console.log(chunk)
  })
  resp.on('error', onerr)
}).on('error', onerr)
