const { accountInformationService } = require('../services')

const router = require('express').Router()

router.post('/', async (req, res, next) => {
    try {
        console.log('post denicez')
        console.log(req.body)
        const accountInformation = await accountInformationService.insert(req.body)

        console.log('posttan sonra')

        res.send(accountInformation)
    } catch (e) {
        console.log(e)
        next('error' + e)
    }
})

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params
    const accountInformation = await accountInformationService.findBy('order', orderId)

    if (!accountInformation) return res.status(404).send('Cannot find account information via order id')

    res.send(accountInformation)
})

router.get('/is-exist/:orderId', async (req, res) => {
    const { orderId } = req.params
    try {
        console.log('bu account informatinin order idsi: ' + orderId)
        const accountInformation = await accountInformationService.findBy('order', orderId)

        res.send(true)
    } catch (error) {
        console.log(error)
        res.send(false)
    }
})

router.patch('/:accountInformationId', async (req, res) => {
    const { object } = req.body
    const { accountInformationId } = req.params

    console.log('güncelleniyor')

    const accountInformation = await accountInformationService.update(accountInformationId, object)

    res.send(accountInformation)
})

module.exports = router
