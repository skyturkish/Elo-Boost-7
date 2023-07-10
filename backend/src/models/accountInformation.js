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
            required: true,
            minlength: 4,
            maxlength: 24
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 100
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('AccountInformation', AccountInformationSchema)
