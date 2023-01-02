import { DataTypes } from 'sequelize'
import db from '../config/database.js'

const Conversation = db.define('conversations', {
        userIdSender: {
            type: DataTypes.INTEGER
        },
        userIdReceiver: {
            type: DataTypes.INTEGER
        }
    }
)

export default Conversation
