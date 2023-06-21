const { accountInformationService } = require('../services')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const { userName, password } = req.body

    try {
        const accountInformation = await accountInformationService.insert({ userName, password })

        res.send(accountInformation)
    } catch (e) {
        next('error' + e)
    }
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params
    const accountInformation = await accountInformationService.findBy('order', orderId)

    if (!accountInformation) return res.status(404).send('Cannot find account information via order id')

    res.send(accountInformation)
})

router.patch('/:accountInformationId', async (req, res) => {
    const { orderId, object } = req.body
    const order = await orderService.update(orderId, object)

    if (object.state == 'taken') {
        const chat = await chatService.findOneBy('order', orderId)
        chat.participants.push(object.booster)
        await chat.save()
    }

    const orders = await orderService.findBy('state', 'active')

    socketServer().to('orders').emit('orders updated', orders)

    res.send(order)
})

module.exports = router
