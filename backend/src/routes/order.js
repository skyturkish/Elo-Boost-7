const socketServer = require('../socket-connection')
const { orderService, chatService } = require('../services')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.load()
    res.send(orders)
})

router.get('/init', async (req, res) => {
    const orders = await orderService.load()

    socketServer().to('orders').emit('orders updated', orders)

    return orders
})

router.post('/', async (req, res, next) => {
    try {
        const order = await orderService.insert(req.body)

        await chatService.insert({
            order: order._id,
            gameType: req.body.gameType,
            participants: [req.body.customer]
        })

        res.send(order)
    } catch (e) {
        next(e)
    }
    const orders = await orderService.load()

    // console.log(orders.filter((order) => order.state == 'active'))
    // burada oyuna göre bildirim yolla
    socketServer().to('orders').emit('orders updated', orders)
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params
    const order = await orderService.find(orderId)

    if (!order) return res.status(404).send('Cannot find order')

    res.send(order)
})

router.get('/by-role/:role/:roleId', async (req, res) => {
    const { role, roleId } = req.params
    console.log('burada')
    if (!(role == 'booster' || role == 'customer')) return res.status(404).send('this role is not valid')
    console.log('sonra burada')

    console.log(role)
    console.log(roleId.split(''))

    const orders = await orderService.findBy(role, roleId)
    console.log('orderslari aldi')

    if (!orders) return res.status(404).send(`Cannot find ${role}'s orders`)
    console.log('orderslarda problem yok')

    res.send(orders)
})

// router.get('/customer/:customerId', async (req, res) => {
//     const { customerId } = req.params
//     const orders = await orderService.findBy('customer', customerId)

//     if (!orders) return res.status(404).send("Cannot find customer's orders")

//     res.send(orders)
// })

// router.get('/booster/:boosterId', async (req, res) => {
//     const { boosterId } = req.params
//     const orders = await orderService.findBy('booster', boosterId)

//     if (!orders) return res.status(404).send("Cannot find booster's orders")

//     res.send(orders)
// })

router.patch('/', async (req, res) => {
    const { orderId, object } = req.body
    const order = await orderService.update(orderId, object)

    if (object.state == 'taken') {
        const chat = await chatService.findOneBy('order', orderId)
        chat.participants.push(object.booster)
        await chat.save()
    }

    const orders = await orderService.load()
    socketServer().to('orders').emit('orders updated', orders)

    res.send(order)
})

router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params

    await orderService.removeBy('_id', orderId)

    const orders = await orderService.load()

    socketServer().to('orders').emit('orders updated', orders)

    res.send('OK')
})

module.exports = router
