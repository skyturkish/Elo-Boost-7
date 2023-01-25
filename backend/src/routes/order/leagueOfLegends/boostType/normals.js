const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const { customer, server, map, gamesAmount, options, extraOptions } =
        req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            gameType: 'League Of Legends',
            server: server,
            orderType: 'normals',
            state: 'active',
            map: map,
            gamesAmount: gamesAmount,
            options: options,
            extraOptions: extraOptions
        })

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
