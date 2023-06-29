const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const randomPhoto = require('../functions/random-photo-selection.js')
const PersonalInformation = require('./personalInformation.js')

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 64
        },
        email: {
            type: String,
            select: false
        },
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['customer', 'booster', 'admin'],
            default: 'customer'
        },
        mainGame: {
            type: String,
            required: true,
            default: 'league-of-legends'
        },
        onlineState: {
            type: String,
            enum: ['online', 'offline', 'dont-disturb'],
            default: 'offline'
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
        mainChampions: {
            type: [String]
        },
        mainServers: {
            type: [String]
        },
        languages: {
            type: [String]
        },
        mainAgents: {
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
        },
        permissions: {
            type: [String],
            default: ['customer']
        },
        personalInformation: {
            type: PersonalInformation
        },
        themePreference: {
            type: Object,
            default: {
                path: 'viego',
                color: '#08866B'
            }
        }
    },
    { timestamps: true }
)

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
    populateFields: ['email']
})

module.exports = mongoose.model('User', User)
