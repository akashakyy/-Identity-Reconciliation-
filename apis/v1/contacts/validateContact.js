const Joi = require('joi');
const responseFormatter = require('../../responseFormatter');

const identifyContactSchema = Joi.object({
    phoneNumber: Joi.string().min(5).max(15).required().optional().messages({
        'string.base': 'phoneNumber should be string',
        'string.max': 'phoneNumber should be less than 15 characters',
        'string.min': 'phoneNumber should be at least of 5 characters'
    }),
    email: Joi.string().email().min(5).max(50).optional().messages({
        'string.email': 'email must be valid email',
        'email.base': 'Invalid email provided',
        'email.max': 'email should be less than 15 characters',
        'email.min': 'email should be at least of 5 characters'
    })
});

async function validateIdentifyContactInput(req, res, next){
    try{
        if(!req.body.phoneNumber && !req.body.email){
            return responseFormatter.badRequest(res,'Please provide either phoneNumber or email');
        }
        const result = await identifyContactSchema.validateAsync(req.body);
        next();

    }catch(error){
        let message = 'failed';
        if(error && error.details && error.details.length){
            message = error.details[0].message;
        }
        return responseFormatter.badRequest(res, message);
    }
}

module.exports = {
    validateIdentifyContactInput
}