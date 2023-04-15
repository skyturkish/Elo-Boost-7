const BaseService = require('./base-service')
const Chat = require('../models/chat')

class ChatService extends BaseService {
    async findInParticipants(participantId) {
        return this.model.find({ participants: participantId })
    }

    async findOneBy(property, value) {
        return this.model.findOne({ [property]: value })
    }
}

module.exports = new ChatService(Chat)
