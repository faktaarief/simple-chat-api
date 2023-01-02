import 'express-group-routes'
import express from 'express'
import userController from '../controllers/user.controller.js'

const router = express.Router()

router.group('/v1/users', (router) => {
  router.post('/register', userController.register)
})

export default router
