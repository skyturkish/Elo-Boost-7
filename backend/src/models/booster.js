const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const BoosterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 64
        },
        balance: {
            type: Number,
            default: 0
        },
        mainGame: {
            type: String,
            required: true
        }

        // oynadığı sunucular  ---> eğer değilse göremeyecek

        // booster classfield rank/ grade => rookie, veteran, legend

        // koçluk yapabilir mi yapamız mı

        // koçluk yapabileceği limit

        // boost yapabileceği limit

        // account
        // rank
        // name
        // lp
        // division

        // personal informations

        // review
    },
    { timestamps: true }
)

BoosterSchema.plugin(autopopulate)

module.exports = mongoose.model('Booster', BoosterSchema)
