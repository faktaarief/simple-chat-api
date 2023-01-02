import UserRepository from '../repositories/user.repository.js'
import ResponseFormatter from '../helpers/responseFormatter.helper.js'
import jwt from 'jsonwebtoken'
import envi from '../config/envi.js'

const authUserMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization?.split(' ')[1]

        if (!token) return ResponseFormatter.customError(res, 403, 'No Token Provided!')
      
        jwt.verify(token, envi.JWT_KEY, async (err, decoded) => {
          if (err) return ResponseFormatter.customError(res, 400, err)
      
          const checkUser = await UserRepository.findBy('email', decoded.email)
          if (!checkUser.email) return ResponseFormatter.customError(res, 404, 'User is Not Found!')
      
          req.id = decoded.id
          req.email = decoded.email

          next()
        })
    } catch (error) {
        return ResponseFormatter.failed(res, error.message)
    }
}

export default authUserMiddleware
