const http = require('http')
const url = require('url')

const [, , port] = process.argv

/**
 * @callback Handler
 * @param params {url.URLSearchParams}
 * @returns {object}
 */
/** @type {{[pathname: string]: Handler}} */
const handlers = {
  '/api/parsetime': (params) => {
    const d = new Date(params.get('iso'))
    return {
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds(),
    }
  },
  '/api/unixtime': (params) => {
    const d = new Date(params.get('iso'))
    return {
      unixtime: d.getTime(),
    }
  },
}

const server = http.createServer((req, res) => {
  const sendStatus = (code, err) => {
    console.error(code, err)
    res.statusCode = code
    res.end()
  }
  if (req.method !== 'GET') return sendStatus(400)

  const u = new url.URL(req.url, `http://${req.headers.host}`)
  const handler = handlers[u.pathname]
  if (!handler) return sendStatus(404)

  res.writeHead(200, {'content-type': 'application/json'})
  res.write(JSON.stringify(handler(u.searchParams)))
  res.end()
})
server.listen(port)
