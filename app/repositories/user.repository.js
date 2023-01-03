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

    findById: async (id) => {
        try {
            return await User.findByPk(id)
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

    findAll: async () => {
        try {
            return await db.query(`SELECT id, name, email FROM users`, { type: QueryTypes.SELECT })
        } catch (error) {
            return error
        }
    }
}

export default UserRepository
