const createError = require('http-errors')
const express = require('express')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const passport = require('passport')
const User = require('./models/user')
const bodyParser = require('body-parser')
const compression = require('compression')

const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const { errors } = require('celebrate')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')
const orderRouter = require('./routes/order')
const messageRouter = require('./routes/message')
const accountInformationRouter = require('./routes/account-information')
const reportRouter = require('./routes/report')

require('./routes/mongo-connection')

var app = express()

app.use(helmet())
app.use(compression())

const corsOptions = {
    origin: process.env.FRONTEND_BASE_PATH || 'http://localhost:5000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.set('trust proxy', 1)

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(
    session({
        secret: 'anything',
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECTION_STRING || 'mongodb://0.0.0.0:27017/game_elo_boost'
        }),
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV == 'production' && 'none',
            secure: process.env.NODE_ENV == 'production'
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(cookieParser())

app.use(mongoSanitize())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/message', messageRouter)
app.use('/account', accountRouter)
app.use('/account-information', accountInformationRouter)
app.use('/report', reportRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

app.use(errors())

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
