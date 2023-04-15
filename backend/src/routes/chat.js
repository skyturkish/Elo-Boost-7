const { chatService, messageService } = require('../services')

const socketServer = require('../socket-connection')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const chats = await chatService.load()
    res.send(chats)
})

router.post('/', async (req, res, next) => {
    const { order, gameType, customerId } = req.body

    try {
        const chat = await chatService.insert({ order, gameType, participants: [customerId] })

        res.send(chat)
    } catch (e) {
        next(e)
    }
})

router.get('/participant/:participantId', async (req, res) => {
    const { participantId } = req.params

    const chats = await chatService.findInParticipants(participantId)

    res.send(chats)
})

router.get('/:chatId', async (req, res) => {
    const { chatId } = req.params

    const chat = await chatService.find(chatId)

    if (!chat) return res.status(404).send('Cannot find chat')

    res.send(chat)
})

router.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params

    const chat = await chatService.findOneBy('order', orderId)

    if (!chat) return res.status(404).send('Cannot find chat with this order id')

    res.send(chat)
})

router.get('/order/:orderId/init', async (req, res) => {
    const { orderId } = req.params

    const chat = await chatService.findOneBy('order', orderId)

    if (!chat) return res.status(404).send('Cannot find chat with this order id')

    await messageService.findBy('chat', chat._id)

    const messages = await messageService.findBy('chat', chat._id)

    res.send(messages)
})

router.get('/order/:orderId/messages', async (req, res) => {
    const { orderId } = req.params

    const chat = await chatService.findOneBy('order', orderId)

    if (!chat) return res.status(404).send('Cannot find chat with this order id')

    const messages = await messageService.findBy('chat', chat._id)

    res.send(messages)
})

router.post('/order/:orderId/messages', async (req, res) => {
    const { orderId } = req.params
    const { sender, message } = req.body

    var chat = await chatService.findOneBy('order', orderId)

    if (!chat) return res.status(404).send('Cannot find chat with this order id')

    const newMessage = await messageService.insert({ chat: chat._id, sender, message })

    socketServer().to(orderId).emit('messages updated', newMessage)

    res.send(newMessage)
})

module.exports = router
