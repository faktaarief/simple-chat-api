import { DataTypes } from 'sequelize'
import db from '../config/database.js'

const User = db.define('users', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
    },
    {
        defaultScope: {
            attributes: {
                exclude: ['password'],
            },
        },
    }
)

export default User
