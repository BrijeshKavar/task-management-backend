import Joi from 'joi';

const paginationSchema = {
  recordPerPage: Joi.number().integer().optional(),
  pageNumber: Joi.number().integer().optional(),
  orderBy: Joi.string().optional(),
  orderDir: Joi.string().valid('ASC', 'DESC').optional()
};

export const schema = {
  paginationSchema
};
