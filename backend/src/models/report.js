const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const ReportSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.ObjectId,
            ref: 'Order'
        },
        note: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['need-help', 'order-done', 'order-abandon']
        },
        state: {
            type: String,
            enum: ['requested', 'process', 'done'],
            default: 'requested'
        }
    },
    { timestamps: true }
)

ReportSchema.plugin(autopopulate)

module.exports = mongoose.model('Report', ReportSchema)
