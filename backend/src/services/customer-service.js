const BaseService = require('./base-service')
const Customer = require('../models/customer')

class CustomerService extends BaseService {}

module.exports = new CustomerService(Customer)
