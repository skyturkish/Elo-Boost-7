const orderService = require('../../../services/order-service')

const divisionsRouter = require('./boostType/divisions')
const placementsRouter = require('./boostType/placements')
const unratedRouter = require('./boostType/unrated')
const winsRouter = require('./boostType/wins')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.findBy('gameType', 'Valorant')
    res.send(orders)
})

router.use('/divisions', divisionsRouter)
router.use('/placements', placementsRouter)
router.use('/unrated', unratedRouter)
router.use('/wins', winsRouter)

module.exports = router
