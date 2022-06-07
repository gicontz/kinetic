import { Router } from 'express';
import { injectable, inject } from 'inversify';

import {
  RULESET_TYPES,
  IRulesetRouter,
  IRulesetValidator,
  IRulesetController,
} from './Ruleset.ioc';

@injectable()
export default class RulesetRouter implements IRulesetRouter {
  public path: string;

  public router: Router;

  private rulesetValidator: IRulesetValidator;

  private rulesetController: IRulesetController;

  constructor(
    @inject(RULESET_TYPES.iRulesetValidator)
    rulesetValidator: IRulesetValidator,
    @inject(RULESET_TYPES.iRulesetController)
    rulesetController: IRulesetController,
  ) {
    this.path = '/ruleset';
    this.router = Router();

    this.rulesetValidator = rulesetValidator;
    this.rulesetController = rulesetController;

    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      `${this.path}`,
      this.rulesetValidator.create,
      this.rulesetController.create,
    );

    this.router.get(`${this.path}`, this.rulesetController.getRulesets);
  };
}
