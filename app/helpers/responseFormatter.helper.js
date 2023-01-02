const ResponseFormatter = {
  success: (res, data) => {
      return res.json({
          code: 200,
          message: 'Successfully!',
          status: true,
          data
      })
  },

  failed: (res, message = 'Failed!') => {
      return res.status(400).json({
          code: 400,
          status: false,
          error: message
      })
  },
  
  customError: (res, code, message = 'Failed!') => {
      return res.status(code).json({
          code,
          status: false,
          error: message
      })
  },
}

export default ResponseFormatter
