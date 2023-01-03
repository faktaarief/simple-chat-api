import { Joi } from 'express-validation'

const showConversationRequest = {
    params: Joi.object({
        id: Joi.number()
    })
}

export default showConversationRequest
