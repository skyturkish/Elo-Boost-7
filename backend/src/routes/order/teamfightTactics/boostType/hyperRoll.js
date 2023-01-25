const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const { customer, server, currentMMR, desiredMMR, options, extraOptions } =
        req.body

    try {
        const teamfightTacticsOrder = await orderService.insert({
            customer: customer,
            state: 'active',
            gameType: 'Teamfight Tactics',
            server: server,
            orderType: 'Divisions',
            currentMMR: currentMMR,
            desiredMMR: desiredMMR,
            options: options,
            extraOptions: extraOptions
        })

        res.send(teamfightTacticsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
