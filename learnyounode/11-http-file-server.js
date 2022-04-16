const fs = require('fs')
const http = require('http')
const bl = require('bl')

const [, , port, filename] = process.argv
const server = http.createServer((req, res) => {
  const onerr = (err) => {
    console.error(err)
    res.statusCode = 500
    res.end()
  }
  req.pipe(
    new bl((err, buf) => {
      if (err) return onerr(err)

      res.writeHead(200, { 'content-type': 'text/plain' })
      fs.createReadStream(filename).pipe(res).on('error', onerr)
    })
  )
})
server.listen(port)
