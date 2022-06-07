import Joi from 'joi';

import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

import { IValidatedRequest } from '@requests/IValidatedRequest';

import { ITransactionValidator } from './Transaction.ioc';
import { TGetTransaction, TCreateTransaction } from './Transaction.data';

@injectable()
export default class TransactionValidator implements ITransactionValidator {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = Joi.object().keys({
      id: Joi.number().required(),
      date: Joi.string().required(),
    });

    try {
      const { id, date } = await bodySchema.validateAsync(req.body);

      (req as IValidatedRequest<TCreateTransaction>).validatedData = {
        id,
        date,
      };

      next();
    } catch (e) {
      next(e);
    }
  };

  public getTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const paramsSchema = Joi.object().keys({
      id: Joi.number().required(),
    });

    try {
      const { id } = await paramsSchema.validateAsync(req.params);

      (req as IValidatedRequest<TGetTransaction>).validatedData = {
        id,
      };

      next();
    } catch (e) {
      next(e);
    }
  };
}
