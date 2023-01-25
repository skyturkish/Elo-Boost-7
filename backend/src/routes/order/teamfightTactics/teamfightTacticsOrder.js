const orderService = require('../../../services/order-service')

const divisionsRouter = require('./boostType/divisions')
const normalsRouter = require('./boostType/normals')
const placementsRouter = require('./boostType/placements')
const winsRouter = require('./boostType/wins')
const hyperRollRouter = require('./boostType/hyperRoll')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.findBy('gameType', 'Teamfight Tactics')
    res.send(orders)
})

router.use('/divisions', divisionsRouter)
router.use('/normals', normalsRouter)
router.use('/placements', placementsRouter)
router.use('/wins', winsRouter)
router.use('/hyperRoll', hyperRollRouter)

router.get('/search', async (req, res) => {
    const orderType = req.query.orderType

    const orders = await orderService.findBy('orderType', orderType)
    res.send(orders)
})

module.exports = router
