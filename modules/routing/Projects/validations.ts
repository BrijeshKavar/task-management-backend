import { commonValidations } from '@neiv/config';
import Joi from 'joi';

const getProjectTasks = {
  params: {
    projectId: Joi.number().required()
  },
  query: {
    search: Joi.string().optional(),
    status: Joi.string().optional(),
    priority: Joi.string().optional(),
    assignee: Joi.string().optional(),
    ...commonValidations.schema.paginationSchema
  }
};

const postTask = {
  body: {
    title: Joi.string().trim().max(100).required(),
    description: Joi.string().trim().max(1000).required().allow(''),
    status: Joi.string().valid('To Do', 'In Progress', 'Done').required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    due_date: Joi.date().min('now').required(),
    project_id: Joi.number().required(),
    assignee_id: Joi.number().required(),
  }
};

const updateTask = {
  params: {
    taskId: Joi.number().required()
  },
  body: {
    title: Joi.string().trim().max(100).required(),
    description: Joi.string().trim().max(1000).required().allow(''),
    status: Joi.string().valid('To Do', 'In Progress', 'Done').required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    due_date: Joi.date().required(),
    project_id: Joi.number().required(),
    assignee_id: Joi.number().required(),
  }
};

const updateOrderIndex = {
  params: {
    projectId: Joi.number().required()
  },
  body: {
    order: Joi.array().items(Joi.number().required()).required()
  }
};

export default {
  getProjectTasks,
  postTask,
  updateTask,
  updateOrderIndex,
};
