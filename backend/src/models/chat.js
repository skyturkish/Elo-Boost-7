const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const ChatSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.ObjectId,
            ref: 'Order',
            autopopulate: { maxDepth: 1 },
            required: true
        },
        gameType: {
            type: String,
            required: true
        },
        state: {
            type: String,
            enum: ['open', 'close'],
            default: 'open'
        },
        participants: [
            {
                type: mongoose.ObjectId,
                ref: 'User'
            }
        ],
        lastMessage: {
            type: mongoose.ObjectId,
            ref: 'Message',
            autopopulate: { maxDepth: 1 }
        }
    },
    {
        timestamps: true
    }
)

ChatSchema.plugin(autopopulate)

ChatSchema.index({ gameType: 1, state: 1 })

module.exports = mongoose.model('Chat', ChatSchema)
