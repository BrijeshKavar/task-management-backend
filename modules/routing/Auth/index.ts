import express from 'express';
import { accessControl } from '@neiv/xacml';
import { authService } from '@neiv/services';
import validations from './validations';
import controls from './accessControls';
const router = express.Router();

router.post(
  '/login',
  accessControl({
    validation: validations.loginSchema,
    pre: controls.pre.login,
    secondaryValidations: controls.secondaryValidation.login
  }),
  authService.login
);

export default router;
