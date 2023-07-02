const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const MessageSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.ObjectId,
            ref: 'Order',
            required: true
        },
        sender: {
            type: mongoose.ObjectId,
            ref: 'User',
            autopopulate: { maxDepth: 1 },
            required: true
        },
        message: {
            type: String,
            required: true,
            maxlength: 500
        }
    },
    {
        timestamps: true
    }
)

MessageSchema.plugin(autopopulate)

MessageSchema.index({ order: 1 })

module.exports = mongoose.model('Message', MessageSchema)
