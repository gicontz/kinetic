import { injectable, inject } from 'inversify';
import update from 'immutability-helper';

import { Promise as BlueBirdPromise } from "bluebird";

import {
  ICashbackService,
} from './Cashback.ioc';

import { ITransactionService, TRANSACTION_TYPES } from '@apis/transaction/Transaction.ioc';
import { IRulesetService, RULESET_TYPES } from '@apis/ruleset/Ruleset.ioc';
import { IRuleset } from '@apis/ruleset/Ruleset.data';

@injectable()
export default class CashbackService implements ICashbackService {
  private transactionService: ITransactionService;
  private ruleSetService: IRulesetService;

  constructor(
    @inject(TRANSACTION_TYPES.iTransactionService) transactionService: ITransactionService,
    @inject(RULESET_TYPES.iRulesetService) ruleSetService: IRulesetService,
  ) {
    this.transactionService = transactionService;
    this.ruleSetService = ruleSetService;
  } 

  private updateRuleSets = async (ars: Required<IRuleset>[]) => {
    const ruleSets = ars.map(async ({ rulesetId, redemptionLimit }) => {
      return this.ruleSetService.reduceRedemptionLimit({ rulesetId, redemptionLimit });
    });

    await Promise.all(ruleSets);
  }

  public getCashback = async () => {
    const transList = await this.transactionService.getTransactions();
    let ruleSets = await this.ruleSetService.getRulesets();

    const cashbacks = transList.sort((a,b) => { return  a.date.getSeconds() - b.date.getSeconds() }).map(({ transactionId, date }) => {
      const availableRs: IRuleset[] = ruleSets.filter(({ startDate, endDate, redemptionLimit }) => {
        let include = [true, true, true];
        if (redemptionLimit !== undefined) {
          include[0] = redemptionLimit > 0;
        }
        
        if (startDate) {
          include[1] = date >= startDate;
        }

        if (endDate) {
          include[2] = date <= endDate;
        }
        
        return !include.includes(false);
      });
      
      if (availableRs.length > 0) {
        const usedRule = availableRs.reduce((prev, cur) => prev.cashback > cur.cashback ? prev : cur);
        if (usedRule.redemptionLimit && usedRule.redemptionLimit > 0) {
          const indx = ruleSets.findIndex(({ rulesetId }) => rulesetId === usedRule.rulesetId);
          ruleSets = update(ruleSets, {
            [indx]: {
              $merge: { redemptionLimit: usedRule.redemptionLimit - 1 }
            }
          })
        }
  
        return {
          transactionId,
          amount: usedRule.cashback
        }
      } else {
        return {
          transactionId,
          amount: 0
        };
      }
    });
    await this.updateRuleSets(ruleSets as Required<IRuleset>[]);
    
    return [...cashbacks];
  };
}
