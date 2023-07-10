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
        game: {
            type: String,
            required: true,
            enum: ['league-of-legends', 'valorant']
        },
        category: {
            type: String,
            enum: ['coaching', 'boosting', 'account']
        },
        state: {
            type: String,
            enum: ['paid', 'active', 'pending', 'assigned', 'paused', 'done', 'canceled'],
            default: 'paid'
        },
        orderType: {
            type: String,
            required: true
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
            type: String,
            maxlength: 250
        }
    },
    {
        strict: false,
        timestamps: true
    }
)

OrderSchema.plugin(autopopulate)

OrderSchema.index({ category: 1, game: 1, state: 1, booster: 1 })

module.exports = mongoose.model('Order', OrderSchema)
