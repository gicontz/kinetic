import Joi from 'joi';

import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

import { IValidatedRequest } from '@requests/IValidatedRequest';

import { IRulesetValidator } from './Ruleset.ioc';
import { TCreateRuleset } from './Ruleset.data';

@injectable()
export default class RulesetValidator implements IRulesetValidator {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = Joi.object().keys({
      startDate: Joi.string(),
      endDate: Joi.string(),
      cashback: Joi.number().greater(0).max(100).required(),
      redemptionLimit: Joi.number(),
    });

    try {
      const { startDate, endDate, cashback, redemptionLimit } = await bodySchema.validateAsync(req.body);

      (req as IValidatedRequest<TCreateRuleset>).validatedData = {
        startDate,
        endDate,
        cashback,
        redemptionLimit
      };

      next();
    } catch (e) {
      next(e);
    }
  };
}
