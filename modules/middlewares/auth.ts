import { log } from '@neiv/logger';
import { NextFunction, Response, Request } from 'express';

type ValidRoleTypes = "admin" | "manager" | "member";

export default (roles: ValidRoleTypes | ValidRoleTypes[] = []) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!roles || !(roles || []).length) {
        return res.withError('The middleware does not have any role defined');
      }
      const allRoles = typeof roles === 'string' ? [roles] : roles;
      if (!req.user) {
        return res.withError('NOT_AUTHENTICATED', 401);
      }

      const userRole = req.user.role;
      if (!allRoles.includes(userRole)) {
        return res.withError('NOT_AUTHORIZED', 403);
      }
      return next();
    } catch (error) {
      log.error('auth middleware Catch: ', error);
      res.withError(error);
    }
  };
