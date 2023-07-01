const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const LeagueOfLegendsAccountSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true
        },
        server: {
            type: String,
            enum: ['Turkey', 'China']
        },
        level: {
            type: Number,
            min: 0
        },
        championLength: {
            type: Number,
            min: 0,
            max: 161
        },
        blueEssence: {
            type: Number,
            min: 0,
            max: 1000000
        },
        skinLength: {
            type: Number,
            min: 0,
            max: 5000
        },
        rankOfAccount: {
            type: String
        },
        state: {
            type: String,
            enum: ['active', 'process', 'released', 'unavailable', 'canceled', 'completed'],
            default: 'active'
        },
        reviewed: {
            type: Boolean,
            default: false,
            required: true
        },
        rp: {
            type: Number,
            min: 0,
            max: 100000
        },
        queue: {
            type: String,
            enum: ['Solo/Duo', 'Flex']
        },
        emailVerified: {
            type: Boolean
        }
    },
    {
        strict: false,
        timestamps: true
    }
)

LeagueOfLegendsAccountSchema.plugin(autopopulate)

LeagueOfLegendsAccountSchema.index({ game: 1, state: 1, booster: 1 })

module.exports = mongoose.model('LeagueOfLegendsAccount', LeagueOfLegendsAccountSchema)
