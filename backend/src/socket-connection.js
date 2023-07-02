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
        socket.on('join-orders', () => {
            socket.join('orders')
        })

        socket.on('leave-orders', () => {
            socket.leave('orders')
        })
        socket.on('join-chat-room', (orderId) => {
            console.log('odaya katılındı ve orderId: ', orderId)
            socket.join('chat-room' + orderId)
        })
        socket.on('leave-chat-room', (orderId) => {
            console.log('odaya ayrıldı ve orderId: ', orderId)
            socket.leave('chat-room' + orderId)
        })
    })

    return socketServer
}
