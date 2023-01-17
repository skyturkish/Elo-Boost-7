const mongoose = require('mongoose')

const RankSchema = new mongoose.Schema({
    division: {
        type: String,
        enum: [
            'Iron',
            'Bronze',
            'Silver',
            'Gold',
            'Platinum',
            'Diamond',
            'Master',
            'Grandmaster',
            'Challenger'
        ]
    },
    // changable name
    divisionMilestone: {
        type: String,
        enum: ['I', 'II', 'III', 'IV']
    },
    currentLP: {
        type: Number
        // min: 0,
        // max: 100
    }
})

module.exports = RankSchema
