const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 9090

const io = require('socket.io')(server)

const { sendMsg } = require('./db')

const cors = require("cors")
app.use(cors())

io.on('connection', (socket) => {
    socket.on('connected', roomId => {
        socket.join(roomId)
    })
    socket.on('message', (newMsg, roomId) => {
        io.to(roomId).emit('message', newMsg)
        sendMsg(newMsg)
    })
    socket.on('disconnect', (reason) => {
        console.log("disconnected - ", reason)
        socket.leave()
    })
})

server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})