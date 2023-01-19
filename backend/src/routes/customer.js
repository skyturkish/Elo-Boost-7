const { customerService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const customer = await customerService.load()
    res.send(customer)
})

router.post('/', async (req, res, next) => {
    const { name } = req.body

    try {
        const customer = await customerService.insert({ name: name })

        res.send(customer)
    } catch (e) {
        next(e)
    }
})

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params

    const customer = await customerService.find(customerId)

    if (!customer) return res.status(404).send('Cannot find customer')
    // res.sendStatus(404) isteği sonlandırıyor

    res.send(customer)
})

router.delete('/:customerId', async (req, res) => {
    const { customerId } = req.params

    await customerService.removeBy('_id', customerId)

    res.send('OK')
})

router.patch('/:customerId/balance', async (req, res) => {
    const { customerId } = req.params

    const { amount } = req.body
    //We can't take customer from this request
    await customerService.findAndUpdateBalance(customerId, amount)

    const customer = await customerService.find(customerId)

    res.send(customer)
})

module.exports = router
