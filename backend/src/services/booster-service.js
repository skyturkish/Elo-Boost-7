const BaseService = require('./base-service')
const Booster = require('../models/booster')

class BoosterService extends BaseService {}

module.exports = new BoosterService(Booster)
