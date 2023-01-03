import 'express-group-routes'
import express from 'express'
import conversationController from '../controllers/conversation.controller.js'
import authUserMiddleware from '../middlewares/authUser.middleware.js'
import showConversationRequest from '../requests/showConversation.request.js'
import { validate } from 'express-validation'

const router = express.Router()

router.group('/v1/conversations', (router) => {
  router.get('/', authUserMiddleware, conversationController.index)
  router.get('/:id', authUserMiddleware, validate(showConversationRequest), conversationController.show)
})

export default router
