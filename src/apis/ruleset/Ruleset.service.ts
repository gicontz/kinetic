import { injectable, inject } from 'inversify';

import NotFoundError from '@errors/NotFoundError';

import {
  RULESET_TYPES,
  IRulesetService,
  IRulesetDao,
} from './Ruleset.ioc';

import { TCreateRuleset, TReduceRedemptionLimit } from './Ruleset.data';

@injectable()
export default class RulesetService implements IRulesetService {
  private rulesetDao: IRulesetDao;

  constructor(
    @inject(RULESET_TYPES.iRulesetDao) rulesetDao: IRulesetDao,
  ) {
    this.rulesetDao = rulesetDao;
  }

  public create = async (data: TCreateRuleset) => {
    const ruleset = await this.rulesetDao.create(data);
    
    return ruleset;
  };

  public getRulesets = async () => {
    const rulesetList = await this.rulesetDao.find();

    return rulesetList;
  };
  
  public reduceRedemptionLimit = async (data: TReduceRedemptionLimit) => {
    const { rulesetId, redemptionLimit } = data;
    if (redemptionLimit >= 0) {
      await this.rulesetDao.update({ rulesetId, redemptionLimit });
    } else {
      throw new Error('Redemption Limit Reached');
    }
  };
}
