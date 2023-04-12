const express = require('express')
const passport = require('passport')
const User = require('../models/user')
const Validator = require('async-validator').default

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.body.user)
    res.send(req.user)
})

router.post('/register', async (req, res, next) => {
    const descriptor = {
        email: [
            { type: 'email', message: 'E-mail is not valid.\n' },
            { required: true, message: 'E-mail is required.\n' }
        ],
        name: [
            { required: true, message: 'Your name is required.\n' },
            { min: 3, message: 'Name should have a minimum length of 3 characters.\n' }
        ],
        password: [
            { required: true, message: 'Password is required.\n' },
            { min: 6, message: 'Password should have a minimum length of 8 characters.\n' }
        ]
    }

    const validator = new Validator(descriptor)

    try {
        await validator.validate(req.body.user)
    } catch ({ errors }) {
        return next({ message: errors.map((e) => e.message).join('') })
    }

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
    passport.authenticate('local', { failWithError: true }),
    async (req, res) => {
        res.send(req.user)
    },
    (err, req, res, next) => {
        if (err.status !== 401) return next(err)

        next(
            new Error(
                'The username and password you provided did not match our records. Please double-check and try again.'
            )
        )
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
