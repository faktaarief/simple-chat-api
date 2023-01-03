import MessageRepository from "../repositories/message.repository.js"
import UserRepository from "../repositories/user.repository.js"

const DataMapper = {
  listConversation: async (conversations, userId) => {
    try {
      let resultArray = []

      for (let conversation of conversations) {
        const conversationId = conversation.id
        const userIdSender = conversation.userIdSender
        const userIdReceiver = conversation.userIdReceiver
        
        const lastMessage = await MessageRepository.findLast(conversationId)
        const senderName = await UserRepository.findById(userIdSender)
        const receiverName = await UserRepository.findById(userIdReceiver)

        /** Define this message from sender or receiver */
        let isFromSender = false
        if (userId === conversation.userIdSender) isFromSender = true

        const unreadMessage = await MessageRepository.countUnreadMessage(conversationId, !isFromSender)

        resultArray.push({
          last_message: lastMessage.message,
          message_time: lastMessage.createdAt,
          sender_name: senderName.name,
          receiver_name: receiverName.name,
          unread_message: unreadMessage.count
        })
      }

      return resultArray
    } catch (error) {
      return error
    }
  }
}

export default DataMapper
