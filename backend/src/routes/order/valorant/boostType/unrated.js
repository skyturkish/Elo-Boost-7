const orderService = require('../../../../services/order-service')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    const { customer, server, gamesAmount, options, extraOptions } = req.body

    try {
        const valorantOrder = await orderService.insert({
            customer: customer,
            gameType: 'Valorant',
            server: server,
            orderType: 'unrated',
            state: 'active',
            gamesAmount: gamesAmount,
            options: options,
            extraOptions: extraOptions
        })

        res.send(valorantOrder)
    } catch (e) {
        next(e)
    }
})
module.exports = router
