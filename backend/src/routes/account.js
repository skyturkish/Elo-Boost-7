const express = require('express')
const passport = require('passport')
const User = require('../models/user')
// const Validator = require('async-validator').default

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.body.user)
    res.send(req.user)
})

router.post('/register', async (req, res, next) => {
    console.log(req.body.user)
    try {
        const user = await User.register(new User(req.body.user), req.body.user.password)
        console.log('user logged in', user)
        res.sendStatus(200)
    } catch (e) {
        return next(e)
    }
})

const regenerateSessionMiddleware = (req, res, next) => {
    if (!req.user) req.session.regenerate(next)
    else next()
}

const preventLoginForLoggedInUsers = (req, res, next) => {
    next(req.user && new Error('User is already logged in'))
}

router.post(
    '/session',
    preventLoginForLoggedInUsers,
    regenerateSessionMiddleware,
    passport.authenticate('local'),
    async (req, res, next) => {
        res.send(req.user)
    }
)

router.delete('/session', async (req, res, next) => {
    await req.logout(function (err) {
        if (err) return next(err)
    })
    req.session.regenerate((err) => {
        if (err) return next(err)

        res.sendStatus(200)
    })
})

router.get('/session', (req, res) => {
    res.send(req.user || null)
})

module.exports = router
