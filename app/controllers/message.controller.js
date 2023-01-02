import ResponseFormatter from '../helpers/responseFormatter.helper.js'

const MessageController = {
  send: async (req, res) => {
    try {
      return ResponseFormatter.success(res, 'Test')
    } catch (error) {
      return ResponseFormatter.failed(res, error.message)
    }
  }
}

export default MessageController
