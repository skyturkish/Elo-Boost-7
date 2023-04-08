const BaseService = require('./base-service')
const User = require('../models/user')

class UserService extends BaseService {
    async findAndUpdateBalance(id, amount) {
        return this.model.findOneAndUpdate(
            { _id: id },
            { $inc: { balance: amount } }
        )
    }
}

module.exports = new UserService(User)
