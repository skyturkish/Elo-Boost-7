const socketServer = require('../socket-connection')
const { messageService } = require('../services')
const router = require('express').Router()

// router.get('/', async (req, res) => {
//   const orders = await orderService.load()
//   res.send(orders)
// })

// router.get('/:orderId/init', async (req, res) => {
//     const orders = await orderService.query({
//         state: 'active'
//     })

//     res.send(orders)
// })

router.post('/', async (req, res, next) => {
    const { order, sender, message } = req.body
    try {
        const newMessage = await messageService.insert({ order, sender, message })

        socketServer()
            .to('chat-room' + order)
            .emit('chat updated' + order, newMessage)

        res.send(message)
    } catch (e) {
        console.log('messsage route da bir hata çıktı' + e)
        next(e)
    }
})

router.get('/:messageId', async (req, res) => {
    const { messageId } = req.params
    const message = await messageService.find(messageId)

    if (!message) return res.status(404).send('Cannot find message')

    res.send(message)
})

router.get('/chat/:orderId', async (req, res) => {
    const { orderId } = req.params
    const messages = await messageService.findBy('order', orderId)

    if (!messages) return res.status(404).send("Cannot find this order's messages")

    res.send(messages)
})

// router.get('/by-role/:role/:roleId', async (req, res) => {
//     const { role, roleId } = req.params
//     if (!(role == 'booster' || role == 'customer')) return res.status(404).send('this role is not valid')

//     const orders = await orderService.findBy(role, roleId)

//     if (!orders) return res.status(404).send(`Cannot find ${role}'s orders`)

//     res.send(orders)
// })

// router.patch('/', async (req, res) => {
//     const { orderId, object } = req.body
//     const order = await orderService.update(orderId, object)

//     if (object.state == 'assigned') {
//         const chat = await chatService.findOneBy('order', orderId)
//         chat.participants.push(object.booster)
//         await chat.save()
//     }

//     const updatedOrder = await orderService.find(orderId)

//     socketServer().to('orders').emit('orders updated', updatedOrder)

//     res.send(order)
// })

// router.delete('/:orderId', async (req, res) => {
//     const { orderId } = req.params

//     await orderService.removeBy('_id', orderId)

//     const orders = await orderService.load()

//     socketServer().to('orders').emit('orders updated', orders)

//     res.send('OK')
// })

module.exports = router
