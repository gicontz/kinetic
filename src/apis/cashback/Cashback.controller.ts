import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import {
  ICashbackController,
  ICashbackService,
  CASHBACK_TYPES,
} from './Cashback.ioc';

@injectable()
export default class CashbackController implements ICashbackController {
  private cashbackService: ICashbackService;

  constructor(
    @inject(CASHBACK_TYPES.iCashbackService)
    cashbackService: ICashbackService,
  ) {
    this.cashbackService = cashbackService;
  }

  public getCashback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.cashbackService.getCashback();
      if (data != null) {
        res.status(200).json([...data]);
      }
    } catch (e) {
      next(e);
    }
  };
}
