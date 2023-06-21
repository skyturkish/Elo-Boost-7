const BaseService = require('./base-service')
const AccountInformation = require('../models/accountInformation')

class AccountInformationService extends BaseService {}

module.exports = new AccountInformationService(AccountInformation)
