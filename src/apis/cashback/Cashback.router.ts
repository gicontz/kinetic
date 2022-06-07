import { Router } from 'express';
import { injectable, inject } from 'inversify';

import {
  CASHBACK_TYPES,
  ICashbackRouter,
  ICashbackController,
} from './Cashback.ioc';

@injectable()
export default class CashbackRouter implements ICashbackRouter {
  public path: string;

  public router: Router;

  private cashbackController: ICashbackController;

  constructor(
    @inject(CASHBACK_TYPES.iCashbackController)
    cashbackController: ICashbackController,
  ) {
    this.path = '/cashback';
    this.router = Router();

    this.cashbackController = cashbackController;

    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(
      `${this.path}`,
      this.cashbackController.getCashback,
    );
  };
}
