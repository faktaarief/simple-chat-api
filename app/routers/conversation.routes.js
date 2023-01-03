import 'express-group-routes'
import express from 'express'
import conversationController from '../controllers/conversation.controller.js'
import authUserMiddleware from '../middlewares/authUser.middleware.js'

const router = express.Router()

router.group('/v1/conversations', (router) => {
  router.get('/', authUserMiddleware, conversationController.index)
  router.get('/:id', authUserMiddleware, conversationController.show)
})

export default router
