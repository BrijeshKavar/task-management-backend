import { Request } from 'express';
import { User } from '@neiv/db';
import { Pre, SecondaryValidation } from '@neiv/xacml';

const checkUserPre: Pre = {
  assign: 'user',
  method: async (req: Request) => {
    const { email } = req.body;
    const existingUser = await User.query().findOne({ email });
    return existingUser || null;
  }
};

const checkUserSecondary: SecondaryValidation = {
  assign: 'CHECK_USER_EXIST',
  method: ({ pre: { user } = { user: User } }) => !!user
};

const pre: {
  [key: string]: Pre[];
} = {
  login: [checkUserPre]
};

const secondaryValidation: {
  [key: string]: SecondaryValidation[];
} = {
  login: [checkUserSecondary]
};

export default {
  pre,
  secondaryValidation
};
