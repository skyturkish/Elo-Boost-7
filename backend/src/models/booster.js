const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const BoosterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 64
        },

        balance: {
            type: Number,
            min: 0
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order',
                autopopulate: true
            }
        ]
    },
    { timestamps: true }
)

BoosterSchema.plugin(autopopulate)

module.exports = mongoose.model('Booster', BoosterSchema)
