import { QueryTypes } from 'sequelize'
import db from '../config/database.js'
import Message from '../models/message.model.js'

const MessageRepository = {
    create: async (data) => {
        try {
            return await Message.create(data)
        } catch (error) {
            return error
        }
    },

    updateMessageToRead: async (conversationId, isFromSender) => {
        try {
            const result = await db.query(`
                UPDATE messages SET isRead = true
                WHERE conversationId = ${conversationId} AND isFromSender = ${isFromSender}`,{ type: QueryTypes.UPDATE }
            )

            return result
        } catch (error) {
            return error
        }
    },

    findLast: async (conversationId) => {
        try {
            const datas = await db.query(`
                SELECT * FROM messages WHERE conversationId = ${conversationId} GROUP BY createdAt DESC`,{ type: QueryTypes.SELECT }
            )
            
            let result

            if (datas.length > 0) result = datas[0]
            else result = []

            return result
        } catch (error) {
            return error
        }
    },

    countUnreadMessage: async (conversationId, isFromSender) => {
        try {
            const result = await db.query(`
                SELECT COUNT(id) as count FROM messages WHERE conversationId = ${conversationId} AND
                isFromSender = ${isFromSender} AND isRead = false`,{ type: QueryTypes.SELECT }
            )

            return result[0]
        } catch (error) {
            return error
        }
    }
}

export default MessageRepository
