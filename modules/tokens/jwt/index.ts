import jwt from 'jsonwebtoken';
import fs from 'fs';
import { constant } from '@neiv/config';
import { Request } from 'express';
import type { StringValue } from "ms";

const PRIVATE_KEY = fs.readFileSync(`${__dirname}/private-Key.key`);
const PUBLIC_KEY = fs.readFileSync(`${__dirname}/public-Key.pub`);

interface SignJwtOptions {
  rememberMe?: boolean;
  isRefreshToken?: boolean;
}

const signJwt = (details: unknown = null, options: SignJwtOptions = {}): string | null => {
  const { rememberMe = false, isRefreshToken = false } = options;
  let expiresIn = (rememberMe ? constant.rememberedTokenExpiry : constant.tokenExpiry) as StringValue;
  if (isRefreshToken) expiresIn = constant.refreshTokenExpiry as StringValue;

  if (!details) {
    return null;
  }

  try {
    const token = jwt.sign(
      { data: details },
      {
        key: PRIVATE_KEY,
        passphrase: constant.jwtPassphrase
      },
      {
        algorithm: 'RS256',
        expiresIn
      }
    );
    return token;
  }
  catch(err) {
    console.log(err);
    
  }
};

const validateJwt = (token = '') => {
  try {
    if (token) {
      return jwt.verify(token, PUBLIC_KEY);
    }
  } catch (err) {
    return null;
  }
};

const findJwt = (req: Request) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1] as string;
  } else if (req.query && req.query.token) {
    return req.query.token as string;
  }
  return null;
};

const verify = async (token: string) => {
  return jwt.verify(token, PUBLIC_KEY);
};

export default {
  signJwt,
  validateJwt,
  findJwt,
  verify
};
