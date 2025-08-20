import { app } from '@neiv/config';
import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';
import transform from './lang';
import notifyError from './notifications';
import { NotifyErrorStackType } from '../type';

type ErrorMessage = {
  status: number;
  message: string;
  stack: string;
  statusCode: number;
};

export default (req: Request, res: Response, next: NextFunction) => {
  res.withValidation = (data = []) => {
    const firstMessage = data[0].message;
    const updated = data.map((single, idx) => {
      return { [single?.context?.key || idx]: single.message };
    });

    const object = {
      data: updated,
      message: transform(firstMessage, 'en'),
      status: 422
    };
    res.status(422).send(object);
  };

  res.withData = (data = null, message, status = 200) => {
    const object = { data, message: transform(message, 'en'), status };
    res.status(status).send(object);
  };

  res.withError = (message, status = 500) => {
    let errMessage = message;
    let errorStack = null;
    if (typeof message === 'object' && !!message) {
      const newMessage = message as ErrorMessage;
      status = newMessage?.status || newMessage?.statusCode || status;
      errMessage = newMessage?.message;
      errorStack = newMessage?.stack;
    }

    if (status === 500 && app.slackWebHook) {
      notifyError(message as NotifyErrorStackType, {
        ...req,
        status
      });
    }

    // Show actual error message while on the development environment.
    // Not in the prod
    errMessage = process.env.NODE_ENV === 'development' ? errMessage : 'GENERAL_ERROR';

    res.status(status).send({
      message: transform(errMessage as string, 'en'),
      status,
      stack: errorStack || undefined
    });
  };

  req.validate = (data, validationObject) => {
    if (Array.isArray(data)) {
      return Joi.array().items(validationObject).validate(data, { abortEarly: false });
    }
    return Joi.object(validationObject).validate(data, { abortEarly: false });
  };

  next();
};
