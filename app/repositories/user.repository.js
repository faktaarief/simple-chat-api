import { QueryTypes } from 'sequelize'
import db from '../config/database.js'
import User from '../models/user.model.js'

const UserRepository = {
    create: async (data) => {
        try {
            return await User.create(data)
        } catch (error) {
            return error
        }
    },

    findBy: async (field, value) => {
        try {
            const datas = await db.query(`SELECT * FROM users WHERE ${field}='${value}'`, { type: QueryTypes.SELECT })
            let result

            if (datas.length > 0) result = datas[0]
            else result = []

            return result
        } catch (error) {
            return error
        }
    },
}

export default UserRepository
