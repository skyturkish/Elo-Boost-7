const mongoose = require('mongoose')

const PersonalInformationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        surName: {
            type: String,
            minlength: 3,
            maxlength: 30
        },
        country: {
            type: String,
            required: true
        },
        birthDate: {
            type: String,
            required: true
        }
    },
    { _id: false }
)

module.exports = PersonalInformationSchema
