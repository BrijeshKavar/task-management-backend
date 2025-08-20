import Joi from 'joi';

const loginSchema = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().max(20).required()
  }
};

export default {
  loginSchema
};
