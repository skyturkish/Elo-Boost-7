const leagueOfLegendsRouter = require('./leagueOfLegends/leagueOfLegendsOrder')
const valorantRouter = require('./valorant/valorantOrder')
const teamfightTacticsRouter = require('./teamfightTactics/teamfightTacticsOrder')
const wildRiftRouter = require('./wildRift/wildRiftOrder')
const socketServer = require('../../socket-connection')

const { orderService } = require('../../services')

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

router.use('/leagueOfLegends', leagueOfLegendsRouter)

router.use('/valorant', valorantRouter)

router.use('/teamfightTactics', teamfightTacticsRouter)

router.use('/wildRift', wildRiftRouter)

router.post('/', async (req, res, next) => {
    try {
        const leagueOfLegendsOrder = await orderService.insert(req.body)

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
    const orders = await orderService.load()

    // console.log(orders.filter((order) => order.state == 'active'))

    socketServer().to('orders').emit('orders updated', orders)
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params

    const order = await orderService.find(orderId)

    if (!order) return res.status(404).send('Cannot find order')

    res.send(order)
})

router.get('/booster/:boosterId', async (req, res) => {
    const { boosterId } = req.params
    const orders = await orderService.findBy('booster', boosterId)

    if (!orders) return res.status(404).send("Cannot find booster's orders")

    res.send(orders)
})

router.get('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params
    const orders = await orderService.findBy('customer', customerId)

    if (!orders) return res.status(404).send("Cannot find customer's orders")

    res.send(orders)
})

router.get('/booster/:boosterId', async (req, res) => {
    const { boosterId } = req.params
    const orders = await orderService.findBy('booster', boosterId)

    if (!orders) return res.status(404).send("Cannot find booster's orders")

    res.send(orders)
})

router.patch('/', async (req, res) => {
    const { orderId, object } = req.body
    const order = await orderService.update(orderId, object)

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
