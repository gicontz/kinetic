import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { IValidatedRequest } from '@requests/IValidatedRequest';

import {
  IRulesetController,
  IRulesetService,
  RULESET_TYPES,
} from './Ruleset.ioc';

import { TCreateRuleset } from './Ruleset.data';

@injectable()
export default class RulesetController implements IRulesetController {
  private rulesetService: IRulesetService;

  constructor(
    @inject(RULESET_TYPES.iRulesetService)
    rulesetService: IRulesetService,
  ) {
    this.rulesetService = rulesetService;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { validatedData } = req as IValidatedRequest<TCreateRuleset>;
      await this.rulesetService.create(validatedData);

      res.status(201).json({
        message: 'Ruleset created'
      });
    } catch (e) {
      next(e);
    }
  };

  public getRulesets = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.rulesetService.getRulesets();

      res.status(200).json({
        ...data,
      });
    } catch (e) {
      next(e);
    }
  };
}
