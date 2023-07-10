const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://0.0.0.0:27017/game_elo_boost'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function () {
    console.log('we are connected to mongodb!')
})

module.exports = { mongoose }
