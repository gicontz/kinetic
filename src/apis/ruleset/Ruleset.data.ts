export interface IRuleset {
  rulesetId?: string;
  startDate?: Date;
  endDate?: Date;
  cashback: number;
  redemptionLimit?: number;
}

export type TCreateRuleset = {
  startDate?: Date;
  endDate?: Date;
  cashback: number;
  redemptionLimit?: number;
};

export type TReduceRedemptionLimit = {
  rulesetId: string;
  redemptionLimit: number;
};

export type TUpdateRuleSet = {
  rulesetId?: string;
  startDate?: Date;
  endDate?: Date;
  cashback?: number;
  redemptionLimit?: number;
}

export type TUpdateRuleSets = {
  rulesetIds: string[];
  data: TUpdateRuleSet[];
}