const BaseService = require('./base-service')
const Customer = require('../models/customer')

class CustomerService extends BaseService {
    async findAndUpdateBalance(id, amount) {
        return this.model.findOneAndUpdate(
            { _id: id },
            { $inc: { balance: amount } }
        )
    }
}

module.exports = new CustomerService(Customer)
