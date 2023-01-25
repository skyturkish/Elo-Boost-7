const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        champion,
        currentMastery,
        desiredMastery,
        hasToken,
        options,
        extraOptions
    } = req.body

    try {
        const leagueOfLegendsOrder = await orderService.insert({
            customer: customer,
            gameType: 'League Of Legends',
            server: server,
            orderType: 'championMastery',
            state: 'active',
            champion: champion,
            currentMastery: currentMastery,
            desiredMastery: desiredMastery,
            hasToken: hasToken,
            options: options,
            extraOptions: extraOptions
        })

        res.send(leagueOfLegendsOrder)
    } catch (e) {
        next(e)
    }
})
module.exports = router
