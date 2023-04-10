const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 64
        },
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['customer', 'booster', 'stuff', 'admin'],
            default: 'customer'
        },
        mainGame: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
    populateFields: ['email']
})

module.exports = mongoose.model('User', User)
