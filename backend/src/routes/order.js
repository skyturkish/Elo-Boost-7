const { orderService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const orders = await orderService.load()
    res.send(orders)
})

router.post('/', async (req, res, next) => {
    const { customer, currentRank, destinationRank, booster, state } = req.body

    try {
        const order = await orderService.insert({
            customer: customer,
            currentRank: currentRank,
            destinationRank: destinationRank,
            booster: booster,
            state: state
        })

        res.send(order)
    } catch (e) {
        next(e)
    }
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params

    const order = await orderService.find(orderId)

    if (!order) return res.status(404).send('Cannot find order')

    console.log(order.booster)
    res.send(order)
})

router.patch('/:orderId', async (req, res, next) => {
    const { orderId } = req.params

    const { booster } = req.body

    const order = await orderService.find(orderId)

    if (order.booster)
        return res.send('Order has been taken by elsewhere booster')

    try {
        const order = await orderService.update(orderId, {
            booster: booster,
            state: 'taken'
        })

        res.send(order)
    } catch (e) {
        next(e)
    }
})

router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params

    await orderService.removeBy('_id', orderId)

    res.send('OK')
})

module.exports = router
