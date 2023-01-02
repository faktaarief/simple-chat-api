import cors from 'cors'
import express from 'express'
import envi from './app/config/envi.js' 
import { ValidationError } from 'express-validation'

/** Initialize Database */
import './app/config/database.js'

/** Initialize Models */
import './app/models/index.js'

/** List Router */
import userRouter from './app/routers/user.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
})

app.listen(envi.PORT, envi.HOST, () => {
    try {
        console.log(`Service is running on ${envi.HOST}:${envi.PORT}`)
    } catch (error) {
        console.error(error)
    }
})
