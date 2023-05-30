const orderService = require('../../../services/order-service')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.findBy('gameType', 'league-of-legends')
    res.send(orders)
})

router.get('/search', async (req, res) => {
    const orderType = req.query.orderType

    const orders = await orderService.findBy('orderType', orderType)
    res.send(orders)
})

module.exports = router
