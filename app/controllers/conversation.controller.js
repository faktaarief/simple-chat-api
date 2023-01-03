import UserRepository from '../repositories/user.repository.js'
import MessageRepository from '../repositories/message.repository.js'
import ResponseFormatter from '../helpers/responseFormatter.helper.js'
import ConversationRepository from '../repositories/conversation.repository.js'
import DataMapper from '../helpers/dataMapper.helper.js'

const ConversationController = {
  index: async (req, res) => {
    try {
      const userId = req.id
      const conversations = await ConversationRepository.findMyConversation(userId)

      let results = []

      if (conversations.length > 0) {
        results = await DataMapper.listConversation(conversations, userId)
      }

      return ResponseFormatter.success(res, results)
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  },

  show: async (req, res) => {
    try {
      // TODO
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  }
}

export default ConversationController
