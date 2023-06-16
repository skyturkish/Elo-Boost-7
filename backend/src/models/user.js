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
        discord: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        mainLanes: {
            type: [String],
            default: ['top', 'jungle']
        },
        mainChampions: {
            type: [String],
            default: ['viego', 'yasuo', 'zac', 'gwen']
        },
        mainServers: {
            type: [String],
            default: ['EUW', 'TR', 'EUNE']
        },
        languages: {
            type: [String],
            default: ['English', 'Turkish']
        },
        mainAgents: {
            type: [String],
            default: ['jett', 'sage', 'brimstone']
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
            default: ['coach', 'booster', 'seller']
        },
        personalInformation: {
            type: PersonalInformation,
            default: {
                name: 'Ahmet',
                surname: 'Yildirim',
                country: 'China',
                birthDate: '25-08-2001'
            }
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
