const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { PORT = 9090 } = process.env
const io = require('socket.io')(server)

const cors = require("cors")
app.use(cors())

io.on('connection', (socket) => {
    socket.on('connected', roomId => {
        socket.join(roomId)
    })
    socket.on('message', (newMsg, roomId) => {
        io.to(roomId).emit('message', newMsg)
    })
    socket.on('disconnect', (reason) => {
        console.log("disconnected - ", reason)
        socket.leave()
    })
})

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})