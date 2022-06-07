import { Router } from 'express';
import { injectable, inject } from 'inversify';

import {
  TRANSACTION_TYPES,
  ITransactionRouter,
  ITransactionValidator,
  ITransactionController,
} from './Transaction.ioc';

@injectable()
export default class TransactionRouter implements ITransactionRouter {
  public path: string;

  public router: Router;

  private transactionValidator: ITransactionValidator;

  private transactionController: ITransactionController;

  constructor(
    @inject(TRANSACTION_TYPES.iTransactionValidator)
    transactionValidator: ITransactionValidator,
    @inject(TRANSACTION_TYPES.iTransactionController)
    transactionController: ITransactionController,
  ) {
    this.path = '/transaction';
    this.router = Router();

    this.transactionValidator = transactionValidator;
    this.transactionController = transactionController;

    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      `${this.path}`,
      this.transactionValidator.create,
      this.transactionController.create,
    );

    this.router.get(
      `${this.path}/:itemId`,
      this.transactionValidator.getTransaction,
      this.transactionController.getTransaction,
    );

    this.router.get(`${this.path}`, this.transactionController.getTransactions);
  };
}
