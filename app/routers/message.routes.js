import 'express-group-routes'
import express from 'express'
import messageController from '../controllers/message.controller.js'
import authUserMiddleware from '../middlewares/authUser.middleware.js'

const router = express.Router()

router.group('/v1/messages', (router) => {
  router.post('/send', authUserMiddleware, messageController.send)
})

export default router
