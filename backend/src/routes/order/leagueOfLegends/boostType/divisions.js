const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        currentRank,
        desiredRank,
        gainingLP,
        options,
        extraOptions
    } = req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            state: 'active',
            gameType: 'League Of Legends',
            server: server,
            orderType: 'Divisions',
            currentRank: currentRank,
            desiredRank: desiredRank,
            gainingLP: gainingLP,
            options: options,
            extraOptions: extraOptions
        })

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
})

module.exports = router
