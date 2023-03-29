const io = require('socket.io')
let socketServer = null

module.exports = (app, server) => {
    if (socketServer) return socketServer

    socketServer = io(server, {
        cors: {
            origin: process.env.FRONTEND_BASE_PATH || 'http://localhost:5000',
            credentials: true
        }
    })
    // this is where to determine what chat is
    socketServer.on('connection', (socket) => {
        //     socket.on('join-room', (chatId) => {
        //         socket.join(chatId)
        //     })
    })

    return socketServer
}
