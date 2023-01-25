const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const {
        customer,
        server,
        currentRank,
        desiredRank,
        currentRR,
        options,
        extraOptions
    } = req.body

    try {
        const valorantOrder = await orderService.insert({
            customer: customer,
            gameType: 'Valorant',
            server: server,
            orderType: 'divisions',
            state: 'active',
            currentRank: currentRank,
            desiredRank: desiredRank,
            currentRR: currentRR,
            options: options,
            extraOptions: extraOptions
        })

        res.send(valorantOrder)
    } catch (e) {
        next(e)
    }
})
module.exports = router
