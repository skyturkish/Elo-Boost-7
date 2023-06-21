const mongoose = require('mongoose')

const AccountInformationSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.ObjectId,
            ref: 'Order',
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('AccountInformation', AccountInformationSchema)
