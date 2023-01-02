import UserRepository from '../repositories/user.repository.js'
import MessageRepository from '../repositories/message.repository.js'
import ResponseFormatter from '../helpers/responseFormatter.helper.js'
import ConversationRepository from '../repositories/conversation.repository.js'

const MessageController = {
  send: async (req, res) => {
    try {
      const checkUserReceiver = await UserRepository.findById(req.body.user_id_receiver)
      if (!checkUserReceiver) throw new Error('User receiver not found')

      const userIdSender = req.id
      const userIdReceiver = checkUserReceiver.id

      if (checkUserReceiver.id === userIdSender) throw new Error('Cannot send message to self')

      /** Check Conversation has Exist or not */
      let conversation = await ConversationRepository.findConversation('userIdSender', 'userIdReceiver', userIdSender, userIdReceiver)
      
      if (!conversation.id) {
        /** Create new Conversation */
        conversation = await ConversationRepository.create({ userIdSender, userIdReceiver })
      } 

      /** Define this message from sender or receiver */
      let isFromSender = false
      if (userIdSender === conversation.userIdSender) isFromSender = true

      /** Insert Message */
      const message = await MessageRepository.create({
        conversationId: conversation.id,
        message: req.body.message,
        isRead: false,
        isFromSender
      })

      return ResponseFormatter.success(res, message)
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  }
}

export default MessageController
