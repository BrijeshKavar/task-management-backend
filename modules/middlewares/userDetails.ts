import { jwt } from '@neiv/tokens';
import { User } from '@neiv/db';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export default async (req: Request, _res: Response, next: NextFunction) => {
  const token = jwt.findJwt(req);
  if (token) {
    const decoded = jwt.validateJwt(token) as JwtPayload;
    if (decoded && decoded.data.purpose === 'auth') {
      const user = await User.query().select('id', 'email', 'role','name').findById(decoded.data.userId);
      if (user) {
        req.user = user;
      }
    }
  }

  return next();
};
