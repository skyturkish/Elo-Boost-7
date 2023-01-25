const orderService = require('../../../services/order-service')

const divisionsRouter = require('./boostType/divisions')
const placementsRouter = require('./boostType/placements')
const normalsRouter = require('./boostType/normals')
const winsRouter = require('./boostType/wins')
const legendaryQueueRouter = require('./boostType/legendaryQueue')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.findBy('gameType', 'Wild Rift')
    res.send(orders)
})

router.use('/divisions', divisionsRouter)
router.use('/placements', placementsRouter)
router.use('/normals', normalsRouter)
router.use('/wins', winsRouter)
router.use('/legendaryQueue', legendaryQueueRouter)

module.exports = router
