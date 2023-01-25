const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        currentRank,
        desiredRank,
        options,
        extraOptions
    } = req.body

    try {
        const teamfightTacticsOrder = await orderService.insert({
            customer: customer,
            state: 'active',
            gameType: 'Teamfight Tactics',
            server: server,
            orderType: 'Divisions',
            currentRank: currentRank,
            desiredRank: desiredRank,
            options: options,
            extraOptions: extraOptions
        })

        res.send(teamfightTacticsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
