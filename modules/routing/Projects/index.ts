import express from 'express';
import { accessControl } from '@neiv/xacml';
import { projectService } from '@neiv/services';
import validations from './validations';
import controls from './accessControls';
import { authMiddleware } from '@neiv/middlewares';
import { roles } from '@neiv/config/constant';
const router = express.Router();

router.get('/:projectId/tasks',
  authMiddleware([roles.admin, roles.manager, roles.member]),
  accessControl({
    validation: validations.getProjectTasks,
    pre: controls.pre.getProjectTasks,
    secondaryValidations: controls.secondaryValidation.getProjectTasks
  }),
  projectService.getProjectTasks
)

router.get('/list',
  authMiddleware([roles.admin, roles.manager, roles.member]),
  projectService.getProjectList
)

router.post('/task',
  authMiddleware([roles.admin, roles.manager]),
  accessControl({
    validation: validations.postTask,
    pre: controls.pre.postTask,
    secondaryValidations: controls.secondaryValidation.postTask
  }),
  projectService.postTask
)

router.patch('/task/:taskId',
  authMiddleware([roles.admin, roles.manager, roles.member]),
  accessControl({
    validation: validations.updateTask,
    pre: controls.pre.updateTask,
    secondaryValidations: controls.secondaryValidation.updateTask
  }),
  projectService.updateTask
)

router.patch('/:projectId/order',
  authMiddleware([roles.admin, roles.manager, roles.member]),
  accessControl({
    validation: validations.updateOrderIndex,
    pre: controls.pre.updateOrderIndex,
    secondaryValidations: controls.secondaryValidation.updateOrderIndex
  }),
  projectService.updateOrderIndex
)

export default router;
