const express = require('express')
const app = express()
const server =  require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:3000'}})

const PORT = 3001

io.on('connection', socket => {
    console.log('Usuario conectado!', socket.id)

    socket.on('disconnect', reason => {
        console.log('Usuario desconectado', socket.id)
    })

    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on('message', text => {
        console.log(socket.id)
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, () => console.log('Server Running...'))