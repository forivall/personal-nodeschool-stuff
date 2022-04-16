const net = require('net')
const dayjs = require('dayjs')

const server = net.createServer((socket) => {  
  // socket handling logic  
  socket.write(dayjs().format('YYYY-MM-DD HH:mm') + '\n')
  socket.end()
})  
server.listen(process.argv[2])  
