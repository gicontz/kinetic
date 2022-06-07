import { Container } from 'inversify';

import {
  RULESET_TYPES,
  IRulesetRouter,
  IRulesetValidator,
  IRulesetController,
  IRulesetService,
  IRulesetDao,
} from '@apis/ruleset/Ruleset.ioc';
import RulesetRouter from '@apis/ruleset/Ruleset.router';
import RulesetValidator from '@apis/ruleset/Ruleset.validator';
import RulesetController from '@apis/ruleset/Ruleset.controller';
import RulesetService from '@apis/ruleset/Ruleset.service';
import RulesetDao from '@daos/ruleset/Ruleset.dao';

export default (iocContainer: Container) => {
  iocContainer
    .bind<IRulesetRouter>(RULESET_TYPES.iRulesetRouter)
    .to(RulesetRouter);
  iocContainer
    .bind<IRulesetValidator>(RULESET_TYPES.iRulesetValidator)
    .to(RulesetValidator);
  iocContainer
    .bind<IRulesetController>(RULESET_TYPES.iRulesetController)
    .to(RulesetController);
  iocContainer
    .bind<IRulesetService>(RULESET_TYPES.iRulesetService)
    .to(RulesetService);
  iocContainer
    .bind<IRulesetDao>(RULESET_TYPES.iRulesetDao)
    .to(RulesetDao);
};
