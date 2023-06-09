const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const randomPhoto = require('../functions/random-photo-selection.js')

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 64
        },
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['customer', 'booster', 'stuff', 'admin'],
            default: 'booster'
        },
        mainGame: {
            type: String,
            required: true
        },
        onlineState: {
            type: String,
            enum: ['online', 'offline', 'dont-disturb'],
            default: 'offline'
        },
        country: {
            type: String
        },
        discord: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        mainLanes: {
            type: [String]
        },
        maxRank: {
            type: String
        },
        rate: {
            type: Number
        },
        photo: {
            type: String,
            default: randomPhoto
        }
    },
    { timestamps: true }
)

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
    populateFields: ['email']
})

module.exports = mongoose.model('User', User)
