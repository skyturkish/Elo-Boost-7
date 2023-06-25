const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const OrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true
        },
        booster: {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        state: {
            type: String,
            enum: ['paid', 'active', 'pending', 'assigned', 'paused', 'done', 'canceled'],
            default: 'paid'
        },
        gameType: {
            type: String,
            required: true
        },
        orderType: {
            type: String,
            required: true
        },
        priority: {
            type: Boolean,
            default: false
        },
        reviewed: {
            type: Boolean,
            default: false
        },
        autoPublish: {
            type: Boolean,
            default: true
        },
        note: {
            type: String
        }
    },
    {
        strict: false,
        timestamps: true
    }
)

OrderSchema.plugin(autopopulate)

OrderSchema.index({ gameType: 1, state: 1, booster: 1 })

module.exports = mongoose.model('Order', OrderSchema)
