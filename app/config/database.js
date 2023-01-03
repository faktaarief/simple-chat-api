import { Sequelize } from 'sequelize'
import envi from './envi.js'

/** Setup Database */
const db = new Sequelize(
    envi.DB_NAME,
    envi.DB_USER,
    envi.DB_PASS,
    {
        host: envi.DB_HOST,
        dialect: envi.DB_DIALECT,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: '+07:00'
        },
        timezone: '+07:00'
    }
)

/** Trying to Connect Database */
try {
    await db.authenticate()
    db.sync({ force: false }).then(() => {
        console.log('Drop and Resync DB')
    })
    console.log('Database Connected...')
} catch (error) {
    console.error('Error Database Connection:', error)
}

export default db
