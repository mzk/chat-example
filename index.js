var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  console.log('socket', socket)
  io.emit('this', { will: 'be received by everyone' })

  io.emit(socket.client.id).emit('chat message', {message: socket.client.id + ' just joined', nick: 'admin'})
  socket.on('chat message', function (msg) {
    console.log('msg', msg)
    io.emit('chat message', msg)
  })
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.emit('news', { hello: 'world' })

})

http.listen(port, function () {
  console.log('listening on *:' + port)
})
