const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const MessageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.ObjectId,
            ref: 'Chat',
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
            required: true
        }
    },
    {
        timestamps: true
    }
)

MessageSchema.plugin(autopopulate)

MessageSchema.index({ chat: 1 })

module.exports = mongoose.model('Message', MessageSchema)
