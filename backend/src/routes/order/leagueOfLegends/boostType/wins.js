const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        currentRank,
        winsAmount,
        queueType,
        options,
        extraOptions
    } = req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            gameType: 'League Of Legends',
            server: server,
            orderType: 'wins',
            state: 'active',
            currentRank: currentRank,
            winsAmount: winsAmount,
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
