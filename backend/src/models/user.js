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
            enum: ['customer', 'employee', 'admin'],
            default: 'customer'
        },
        onlineState: {
            type: String,
            enum: ['online', 'offline', 'dont-disturb'],
            default: 'offline'
        },
        maxRank: {
            type: String
        },
        discord: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        languages: {
            type: [String]
        },
        rate: {
            type: Number
        },
        photo: {
            type: String,
            default: randomPhoto
        },
        permissions: {
            type: Object
            // default: {
            //     customer: 'premium-customer',
            //     booster: {
            //         grade: 'divine-booster',
            //         games: {
            //             'league-of-legends': {
            //                 maxRank: 'diamond-1',
            //                 limits: {
            //                     soloLimit: 3,
            //                     duoLimit: 3
            //                 }
            //             },
            //             valorant: {
            //                 maxRank: 'diamond-3',
            //                 limits: {
            //                     soloLimit: 2,
            //                     duoLimit: 2
            //                 }
            //             }
            //         }
            //     },
            //     coach: {
            //         grade: 'elite-coach',
            //         games: {
            //             'league-of-legends': {
            //                 maxRank: 'diamond-1'
            //             },
            //             valorant: {
            //                 maxRank: 'ascendant-3'
            //             }
            //         }
            //     },
            //     seller: 'elite-seller'
            // }
        },
        notifications: {
            type: Object,
            default: {}
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
