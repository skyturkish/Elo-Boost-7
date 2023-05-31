const { coachingService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const coachings = await coachingService.load()
    res.send(coachings)
})

router.post('/', async (req, res, next) => {
    try {
        const coachings = await coachingService.insert(req.body)

        res.send(coachings)
    } catch (e) {
        console.log('hata ' + e)
        next(e)
    }
})

router.get('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params
    const orders = await coachingService.findBy('customer', customerId)

    if (!orders) return res.status(404).send("Cannot find customer's orders")

    res.send(orders)
})

router.get('/booster/:coachID', async (req, res) => {
    const { coachId } = req.params
    const orders = await coachingService.findBy('coach', coachId)

    if (!orders) return res.status(404).send("Cannot find coach's orders")

    res.send(orders)
})

router.use('/:coachingId', (req, res, next) => {
    const { coachingId } = req.params
    // bunu tüm routelarda yapabiliriz
    if (!coachingId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('coachingId is not valid')

    next()
})

router.get('/:coachingId', async (req, res) => {
    const { coachingId } = req.params

    const coaching = await coachingService.find(coachingId)

    if (!coaching) return res.status(404).send('Cannot find coaching order')

    res.send(coaching)
})
module.exports = router
