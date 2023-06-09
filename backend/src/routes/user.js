const { userService } = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const users = await userService.load()
    res.send(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await userService.insert(req.body)

        res.send(user)
    } catch (e) {
        next(e)
    }
})

router.get('/role/:role', async (req, res) => {
    const { role } = req.params

    const users = await userService.findBy('role', role)

    res.send(users)
})

router.use('/:userId', (req, res, next) => {
    const { userId } = req.params

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('userId is not valid')

    next()
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    const user = await userService.find(userId)

    if (!user) return res.status(404).send('Cannot find user')

    res.send(user)
})

router.delete('/:userId', async (req, res) => {
    const { userId } = req.params

    await userService.removeBy('_id', userId)

    res.send('OK')
})

router.patch('/:userId', async (req, res) => {
    const { userId } = req.params

    const { email } = req.body

    if (email) return res.status(405).send('You cannot change email')

    const user = await userService.update(userId, req.body)

    res.send(user)
})

router.patch('/:userId/balance', async (req, res) => {
    const { userId } = req.params

    const { amount } = req.body
    //We can't take user from this request
    await userService.findAndUpdateBalance(userId, amount)

    const user = await userService.find(userId)

    res.send(user)
})

module.exports = router
