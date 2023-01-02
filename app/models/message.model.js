import { DataTypes } from 'sequelize'
import db from '../config/database.js'

const Message = db.define('messages', {
        conversationId: {
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.TEXT
        },
        isRead: {
          type: DataTypes.BOOLEAN
        },
        isFromSender: {
          type: DataTypes.BOOLEAN
        }
    }
)

export default Message
