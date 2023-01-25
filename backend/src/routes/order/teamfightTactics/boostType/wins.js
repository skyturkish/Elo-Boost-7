const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const { customer, server, currentRank, winsAmount, options, extraOptions } =
        req.body

    try {
        const teamfightTacticsOrder = await orderService.insert({
            customer: customer,
            state: 'active',
            gameType: 'Teamfight Tactics',
            server: server,
            orderType: 'wins',
            currentRank: currentRank,
            winsAmount: winsAmount,
            options: options,
            extraOptions: extraOptions
        })

        res.send(teamfightTacticsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
