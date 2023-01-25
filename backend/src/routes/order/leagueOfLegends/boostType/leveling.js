const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        currentLevel,
        desiredLevel,
        options,
        extraOptions
    } = req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            gameType: 'League Of Legends',
            server: server,
            orderType: 'leveling',
            state: 'active',
            currentLevel: currentLevel,
            desiredLevel: desiredLevel,
            options: options,
            extraOptions: extraOptions
        })

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
})
module.exports = router
