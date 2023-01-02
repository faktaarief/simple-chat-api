import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../..', '.env') })

const envi = {
    // ROOT PATH
    ROOT_PATH: path.join(__dirname, '../..'),

    // SERVER
    PORT: process.env.PORT,
    HOST: process.env.HOST,

    // DATABASE
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,

    // JWT
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRED: process.env.JWT_EXPIRED,
}

export default envi
