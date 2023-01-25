const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        previousRank,
        gamesAmount,
        queueType,
        options,
        extraOptions
    } = req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            gameType: 'League Of Legends',
            server: server,
            orderType: 'placements',
            state: 'active',
            previousRank: previousRank,
            gamesAmount: gamesAmount,
            queueType: queueType,
            options: options,
            extraOptions: extraOptions
        })

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
