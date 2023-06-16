const mongoose = require('mongoose')

const PersonalInformationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surName: {
            type: String
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
