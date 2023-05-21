const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const LeagueOfLegendsRank = require('./leagueOfLegendsRank')

const CoachingSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true
        },
        coach: {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        state: {
            type: String,
            enum: ['active', 'process', 'released', 'unavailable', 'canceled', 'completed'],
            default: 'active'
        },
        gameType: {
            type: String,
            required: true
        },
        coachingType: {
            type: String,
            enum: ['lesson', 'game-replay', 'live-game', 'play-together'],
            required: true
        },
        currentRank: {
            type: LeagueOfLegendsRank,
            required: true
        },
        reviewed: {
            type: Boolean,
            default: false,
            required: true
        },
        lessonHour: {
            type: String
        },
        amountGame: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

CoachingSchema.plugin(autopopulate)

CoachingSchema.index({ gameType: 1, state: 1, coach: 1 })

module.exports = mongoose.model('Coaching', CoachingSchema)
