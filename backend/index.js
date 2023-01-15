const express = require('express')
const indexRouter = require('./src/routes/index')

// body-parser helps to understand this file send with post is JSON
const bodyParser = require('body-parser')

require('./src/routes/mongo-connection')

const app = express()

app.use(bodyParser.json())

app.use('/', indexRouter)

module.exports = app
