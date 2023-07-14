const { reportService, orderService } = require('../services')

const router = require('express').Router()

function ensureLogin(req, res, next) {
    if (req.user) return next()

    next(new Error('Unauthorized'))
}

router.use('/', ensureLogin)

router.get('/', async (req, res) => {
    const reports = await reportService.load()
    res.send(reports)
})

router.get('/:reportId', async (req, res) => {
    const { reportId } = req.params
    const report = await reportService.find(reportId)

    if (!report) return res.status(404).send('Cannot find report')

    res.send(report)
})

router.post('/', async (req, res, next) => {
    try {
        const report = await reportService.insert(req.body)

        console.log(report.order)
        console.log(report.order._id)

        await orderService.update(report.order._id, {
            state: 'paused'
        })

        res.send(report)
    } catch (e) {
        console.log('hata:' + e)
        next(e)
    }
})

module.exports = router
