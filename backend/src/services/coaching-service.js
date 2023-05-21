const BaseService = require('./base-service')
const Coaching = require('../models/coaching')

class CoachingService extends BaseService {}

module.exports = new CoachingService(Coaching)
