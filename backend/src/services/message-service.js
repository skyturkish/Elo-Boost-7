const BaseService = require('./base-service')
const Message = require('../models/message')

class MessageService extends BaseService {}

module.exports = new MessageService(Message)
