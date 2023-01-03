import 'express-group-routes'
import express from 'express'
import messageController from '../controllers/message.controller.js'
import authUserMiddleware from '../middlewares/authUser.middleware.js'
import { validate } from 'express-validation'
import sendMessageRequest from '../requests/sendMessage.requests.js'

const router = express.Router()

router.group('/v1/messages', (router) => {
  router.post('/send', authUserMiddleware, validate(sendMessageRequest), messageController.send)
})

export default router
