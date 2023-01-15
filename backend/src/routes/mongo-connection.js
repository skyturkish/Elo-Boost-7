const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://0.0.0.0:27017/game_elo_boost')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function () {
    console.log('we are connected to mongodb!')
})
