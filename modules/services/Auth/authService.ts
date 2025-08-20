import { Request, Response } from 'express';
import logger from '@neiv/logger/common';
import passwordHelper from '@neiv/tokens/password';
import { jwt } from '@neiv/tokens';

export const login = async (req: Request, res: Response) => {
  try {
    const { user } = req.pre;
    const { password } = req.body;
    if (user) {
      const { password: passwordHash } = user;
      if (!passwordHelper.comparePassword(passwordHash, password)) {
        return res.withError('INVALID_PASSWORD', 406);
      } else {
        const token = jwt.signJwt({
          userId: user.id,
          email: user.email,
          role: user.role,
          name:user.name,
          purpose: 'auth'
        });

        const refreshToken = jwt.signJwt(
          {
            userId: user.id,
            email: user.email,
            role: user.role,
            name:user.name,
          },
          {
            isRefreshToken: true
          }
        );
        const { password, ...userWithoutPassword } = user;
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        return res.withData(
          {
            token,
            loginDetail: {
              ...userWithoutPassword
            }
          },
          'AUTH_LOGIN',
          200
        );
      }
    }
  } catch (error) {
    logger.error('login Catch: ', error);
    return res.withError(error);
  }
};
