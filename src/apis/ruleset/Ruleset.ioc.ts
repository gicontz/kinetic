import { Router, Request, Response, NextFunction } from 'express';

import {
  IRuleset,
  TCreateRuleset,
  TReduceRedemptionLimit,
  TUpdateRuleSet,
  TUpdateRuleSets,
} from './Ruleset.data';

export const RULESET_TYPES = {
  iRulesetRouter: Symbol.for('IRulesetRouter'),
  iRulesetValidator: Symbol.for('IRulesetValidator'),
  iRulesetController: Symbol.for('IRulesetController'),
  iRulesetService: Symbol.for('IRulesetService'),
  iRulesetDao: Symbol.for('IRulesetDao'),
};

export interface IRulesetRouter {
  path: string;
  router: Router;
}

export interface IRulesetValidator {
  create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IRulesetController {
  create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getRulesets: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export interface IRulesetService {
  create: (data: TCreateRuleset) => Promise<IRuleset>;
  reduceRedemptionLimit: (data: TReduceRedemptionLimit) => Promise<void>;
  getRulesets: () => Promise<IRuleset[]>;
}

export interface IRulesetDao {
  create: (data: TCreateRuleset) => Promise<IRuleset>;
  update: (data: TUpdateRuleSet) => Promise<void>;
  updateMany: (data: TUpdateRuleSets) => Promise<void>;
  findById: (id: string) => Promise<IRuleset | null>;
  find: () => Promise<IRuleset[]>;
}
