import ResponseFormatter from '../helpers/responseFormatter.helper.js'
import UserRepository from '../repositories/user.repository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import envi from '../config/envi.js'

const UserController = {
  index: async (req, res) => {
    try {
      const users = await UserRepository.findAll()

      return ResponseFormatter.success(res, users)
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  },

  register: async (req, res) => {
    try {
        const checkUser = await UserRepository.findBy('email', req.body.email)
        
        if (checkUser.email) throw new Error('Email has existing')

        /** Generate encrypt password */
        req.body.password = bcrypt.hashSync(req.body.password)

        const user = await UserRepository.create(req.body)
        const token = jwt.sign({ id: user.id, email: user.email }, envi.JWT_KEY, { expiresIn: parseInt(envi.JWT_EXPIRED) })

        return ResponseFormatter.success(res, { id: user.id, token })
    } catch (error) {
        return ResponseFormatter.failed(res, error.message)
    }
  },

  login: async (req, res) => {
    try {
        const checkUser = await UserRepository.findBy('email', req.body.email)
        if (!checkUser.email) throw new Error('Email is not registered')

        const checkPassword = bcrypt.compareSync(req.body.password, checkUser.password)
        if (!checkPassword) throw new Error('Email or password is wrong')

        const token = jwt.sign({ id: checkUser.id, email: checkUser.email }, envi.JWT_KEY, { expiresIn: parseInt(envi.JWT_EXPIRED) })

        return ResponseFormatter.success(res, { token })
    } catch (error) {
        return ResponseFormatter.failed(res, error.message)
    }
  }
}

export default UserController
