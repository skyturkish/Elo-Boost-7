const mongoose = require('mongoose')
const Rank = require('./rank')
const autopopulate = require('mongoose-autopopulate')

const OrderSchema = new mongoose.Schema(
    {
        currentRank: Rank,
        destinationRank: Rank,
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            autopopulate: true
        },

        booster: {
            type: Schema.Types.ObjectId,
            ref: 'Booster',
            autopopulate: true
        },
        state: {
            type: String,
            // change name of free
            enum: ['free', 'released', 'canceled', 'completed'],
            default: 'free'
        }
    },
    { timestamps: true }
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
