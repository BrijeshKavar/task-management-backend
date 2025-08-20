import { constant } from '@neiv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const generateToken = (details: object, expiresIn = '2d') => {
  return jwt.sign(details, constant.mailTokenSecret, { expiresIn });
};

const decodeToken = (token: string) => {
  try {
    const decode = jwt.verify(token, constant.mailTokenSecret);
    return decode as JwtPayload;
  } catch (_err) {
    return null;
  }
};

export default {
  generateToken,
  decodeToken
};
