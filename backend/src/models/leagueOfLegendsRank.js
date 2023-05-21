const mongoose = require('mongoose')

const LeagueOfLegendsRankSchema = new mongoose.Schema(
    {
        division: {
            type: String,
            enum: ['iron', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'naster', 'grandmaster', 'challenger'],
            required: true
        },
        // changable name
        divisionMilestone: {
            type: String,
            enum: ['I', 'II', 'III', 'IV']
        },
        currentLP: {
            type: String,
            required: true
        }
    },
    { _id: false }
)

module.exports = LeagueOfLegendsRankSchema
