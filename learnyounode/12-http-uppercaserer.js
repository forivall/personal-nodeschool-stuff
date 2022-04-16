const http = require('http')
const bl = require('bl')

const [, , port] = process.argv
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
      res.write(buf.toString('utf8').toUpperCase())
      res.end()
    })
  )
})
server.listen(port)
