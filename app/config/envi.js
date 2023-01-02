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
}

export default envi
