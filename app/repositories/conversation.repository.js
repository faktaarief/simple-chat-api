import { QueryTypes } from 'sequelize'
import db from '../config/database.js'
import Conversation from '../models/conversation.model.js'

const ConversationRepository = {
    create: async (data) => {
        try {
            return await Conversation.create(data)
        } catch (error) {
            return error
        }
    },

    findConversation: async (fieldOne, fieldTwo, valueOne, valueTwo) => {
        try {
            const datas = await db.query(`
                SELECT * FROM conversations WHERE (${fieldOne}='${valueOne}' AND
                ${fieldTwo}=${valueTwo}) OR (${fieldOne}='${valueTwo}' AND
                ${fieldTwo}=${valueOne})
                `,{ type: QueryTypes.SELECT }
            )
            
            let result

            if (datas.length > 0) result = datas[0]
            else result = []

            return result
        } catch (error) {
            return error
        }
    }
}

export default ConversationRepository
