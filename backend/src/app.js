const createError = require('http-errors')
const express = require('express')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order/order')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
var cors = require('cors')
const passport = require('passport')
const User = require('./models/user')
var accountRouter = require('./routes/account')
// body-parser helps to understand this file send with post is JSON
const bodyParser = require('body-parser')
require('./routes/mongo-connection')
var app = express()

const corsOptions = {
    origin: process.env.FRONTEND_BASE_PATH || 'http://localhost:5000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(
    session({
        secret: 'anything',
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECTION_STRING || 'mongodb://0.0.0.0:27017/game_elo_boost'
        }),
        resave: true,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(cookieParser())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/account', accountRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.send(
        req.app.get('env') === 'development' ? { stack: err.stack, message: err.message } : { message: err.message }
    )
})

module.exports = app
