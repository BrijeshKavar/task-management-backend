import { constant } from '@neiv/config';
import bcrypt from 'bcrypt';

const encryptPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, constant.passwordsaltRound);
  } catch (error) {
    return null;
  }
};

const comparePassword = (hashed: string, string: string) => {
  try {
    return bcrypt.compareSync(string, hashed);
  } catch (error) {
    return false;
  }
};

export default {
  encryptPassword,
  comparePassword
};
