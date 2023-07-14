const BaseService = require('./base-service')
const Report = require('../models/report')

class ReportService extends BaseService {}

module.exports = new ReportService(Report)
