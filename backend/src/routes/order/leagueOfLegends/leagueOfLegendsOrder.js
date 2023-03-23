const orderService = require('../../../services/order-service')

const divisionsRouter = require('./boostType/divisions')
const normalsRouter = require('./boostType/normals')
const placementsRouter = require('./boostType/placements')
const winsRouter = require('./boostType/wins')
const levelingRouter = require('./boostType/leveling')
const championMasteryRouter = require('./boostType/championMastery')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.findBy('gameType', 'League Of Legends')

    res.send(orders)
})

router.use('/divisions', divisionsRouter)
router.use('/normals', normalsRouter)
router.use('/placements', placementsRouter)
router.use('/wins', winsRouter)
router.use('/leveling', levelingRouter)
router.use('/championMastery', championMasteryRouter)

router.get('/search', async (req, res) => {
    const orderType = req.query.orderType

    const orders = await orderService.findBy('orderType', orderType)
    res.send(orders)
})

router.patch('/', async (req, res) => {
    const { orderId, object } = req.body
    const order = await orderService.update(orderId, object)
    res.send(order)
})

module.exports = router
