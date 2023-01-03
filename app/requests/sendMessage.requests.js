import { Joi } from 'express-validation'

const sendMessageRequest = {
    body: Joi.object({
      user_id_receiver: Joi.number().required(),
      message: Joi.string().required()
    })
}

export default sendMessageRequest
