import Message from '../models/message.model.js'

const MessageRepository = {
    create: async (data) => {
        try {
            return await Message.create(data)
        } catch (error) {
            return error
        }
    }
}

export default MessageRepository
