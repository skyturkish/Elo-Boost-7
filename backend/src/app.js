const express = require('express')
const indexRouter = require('./routes/index')
const boosterRouter = require('./routes/booster')
const customerRouter = require('./routes/customer')
const orderRouter = require('./routes/order/order')

var cors = require('cors')

// body-parser helps to understand this file send with post is JSON
const bodyParser = require('body-parser')

require('./routes/mongo-connection')

const app = express()

app.use(bodyParser.json())

const corsOptions = {
    origin: process.env.FRONTEND_BASE_PATH || 'http://localhost:5000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use('/', indexRouter)
app.use('/booster', boosterRouter)
app.use('/customer', customerRouter)
app.use('/order', orderRouter)

module.exports = app
