const { accountInformationService } = require('../services')

const router = require('express').Router()

function ensureLogin(req, res, next) {
    if (req.user) return next()

    next(new Error('Unauthorized'))
}

router.use('/', ensureLogin)

router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params
    const accountInformation = await accountInformationService.findByOne('order', orderId)

    if (!accountInformation) return res.send(null)

    res.send(accountInformation)
})

router.patch('/:orderId', async (req, res) => {
    const { object } = req.body
    const { orderId } = req.params

    const accountInformation = await accountInformationService.updateBy('order', orderId, object)

    res.send(accountInformation)
})

module.exports = router
