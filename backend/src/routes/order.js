const socketServer = require('../socket-connection')
const { orderService } = require('../services')
const router = require('express').Router()
const { celebrate, Joi, Segments } = require('celebrate')

function ensureLogin(req, res, next) {
    if (req.user) return next()

    next(new Error('Unauthorized'))
}

router.use('/', ensureLogin)

router.get('/', async (req, res) => {
    const orders = await orderService.load()
    res.send(orders)
})

router.get('/init', async (req, res) => {
    const orders = await orderService.query({
        state: { $ne: 'done' }
    })

    res.send(orders)
})

router.post('/', async (req, res, next) => {
    try {
        const order = await orderService.insert(req.body)

        res.send(order)
    } catch (e) {
        console.log('hata:' + e)
        next(e)
    }
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params
    const order = await orderService.find(orderId)

    if (!order) return res.status(404).send('Cannot find order')

    res.send(order)
})

router.get('/by-role/:role/:roleId', async (req, res) => {
    const { role, roleId } = req.params
    if (!(role == 'employee' || role == 'customer')) return res.status(404).send('this role is not valid')

    const orders = await orderService.findBy(role == 'employee' ? 'booster' : role, roleId)

    if (!orders) return res.status(404).send(`Cannot find ${role}'s orders`)

    res.send(orders)
})

router.patch('/', async (req, res) => {
    const { orderId, object } = req.body

    const order = await orderService.update(orderId, object)

    const updatedOrder = await orderService.find(orderId)

    socketServer().to('orders').emit('orders updated', updatedOrder)

    res.send(order)
})

module.exports = router
