const BaseService = require('./base-service')
const Booster = require('../models/booster')

class BoosterService extends BaseService {
    async findAndUpdateBalance(id, amount) {
        return this.model.findOneAndUpdate(
            { _id: id },
            { $inc: { balance: amount } }
        )
    }
}

module.exports = new BoosterService(Booster)
