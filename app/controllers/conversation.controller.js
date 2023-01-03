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
      const userId = req.id
      const conversationId = parseInt(req.params.id)

      const conversations = await ConversationRepository.findMyConversation(userId)

      /** Conversation permit only read to related user */
      let permit = false
      let userIdSender
      let userIdReceiver 

      for (let conversation of conversations) {
        if (conversationId === conversation.id) {
          permit = true
          userIdSender = conversation.userIdSender
          userIdReceiver = conversation.userIdReceiver
        }
      }
      
      let results = []

      if (permit) {
        const senderName = await UserRepository.findById(userIdSender)
        const receiverName = await UserRepository.findById(userIdReceiver)

        /** Define this message from sender or receiver */
        let isFromSender = false
        if (userId === userIdSender) isFromSender = true

        /** When sender or receiver reply this conversation, assume previous message is readed */
        await MessageRepository.updateMessageToRead(conversationId, !isFromSender)
        
        results = {
          sender_id: senderName.id,
          sender_name: senderName.name,
          receiver_id: receiverName.id,
          receiver_name: receiverName.name,
          messages: await DataMapper.showConversation(conversationId)
        }
      }

      return ResponseFormatter.success(res, results)
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  }
}

export default ConversationController
