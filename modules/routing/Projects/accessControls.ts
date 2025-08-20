import { Request } from 'express';
import { Project, Task } from '@neiv/db';
import { Pre, SecondaryValidation } from '@neiv/xacml';

const checkProjectPre: Pre = {
  assign: 'project',
  method: async (req: Request) => {
    if (req.params.projectId || req.body.project_id) {
      const project = await Project.query().select('id').findById(req.params.projectId || req.body.project_id)
      return project || null
    }
    return null
  }
};

const checkProjectSecondary: SecondaryValidation = {
  assign: 'PROJECT_NOT_FOUND',
  method: ({ pre: { project } }) => !!project,
};

const checkTaskPre: Pre = {
  assign: 'task',
  method: async (req: Request) => {
    if (req.params.taskId) {
      const task = await Task.query().select('id').findById(req.params.taskId)
      return task || null
    }
    return null
  }
};

const checkTaskSecondary: SecondaryValidation = {
  assign: 'TASK_NOT_FOUND',
  method: ({ pre: { task } }) => !!task,
};

const checkTaskCountPre: Pre = {
  assign: 'taskCount',
  method: async (req: Request) => {
    if (req.params.projectId) {
      const existing_tasks = (await Task.query()
        .where({ project_id: req.params.projectId })
        .count('id as id')
        .first())
        ?.id ?? 0

      return existing_tasks
    }
    return 0
  }
};

const checkTaskCountSecondary: SecondaryValidation = {
  assign: 'TASK_NOT_FOUND',
  method: ({ pre: { taskCount }, body: { order } }) => taskCount > 0 && taskCount === order.length,
};

const pre: {
  [key: string]: Pre[];
} = {
  getProjectTasks: [checkProjectPre],
  postTask: [checkProjectPre],
  updateTask: [
    checkProjectPre,
    checkTaskPre,
  ],
  updateOrderIndex: [
    checkProjectPre,
    checkTaskCountPre,
  ],
};

const secondaryValidation: {
  [key: string]: SecondaryValidation[];
} = {
  getProjectTasks: [checkProjectSecondary],
  postTask: [checkProjectSecondary],
  updateTask: [
    checkProjectSecondary,
    checkTaskSecondary,
  ],
  updateOrderIndex: [
    checkProjectSecondary,
    checkTaskCountSecondary,
  ],
};

export default {
  pre,
  secondaryValidation
};
