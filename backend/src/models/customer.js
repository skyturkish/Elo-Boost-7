const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const CustomerSchema = new mongoose.Schema(
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
                type: mongoose.ObjectId,
                ref: 'Order',
                autopopulate: true
            }
        ]
    },
    { timestamps: true }
)

CustomerSchema.plugin(autopopulate)

module.exports = mongoose.model('Customer', CustomerSchema)
