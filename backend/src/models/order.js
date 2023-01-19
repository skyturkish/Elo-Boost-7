const mongoose = require('mongoose')
const Rank = require('./rank')
const autopopulate = require('mongoose-autopopulate')

const OrderSchema = new mongoose.Schema(
    {
        currentRank: Rank,
        destinationRank: Rank,
        customer: {
            type: mongoose.ObjectId,
            ref: 'Customer',
            autopopulate: false,
            required: true
        },

        booster: {
            type: mongoose.ObjectId,
            ref: 'Booster',
            autopopulate: false
        },
        state: {
            type: String,
            // change name of free
            enum: ['free', 'taken', 'released', 'canceled', 'completed'],
            default: 'free'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// not stored ? this is what we want ???
// we will query with price ??? not sort, query
OrderSchema.virtual('price').get(function () {
    // destinationRank - currentRank
    // calculate price with the formule ????
    return 100
})

OrderSchema.plugin(autopopulate)

module.exports = mongoose.model('Order', OrderSchema)
