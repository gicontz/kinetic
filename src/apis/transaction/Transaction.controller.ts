import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { IValidatedRequest } from '@requests/IValidatedRequest';

import {
  ITransactionController,
  ITransactionService,
  TRANSACTION_TYPES,
} from './Transaction.ioc';

import {
  TGetTransaction,
  ITransaction
} from './Transaction.data';

@injectable()
export default class TransactionController implements ITransactionController {
  private transactionService: ITransactionService;

  constructor(
    @inject(TRANSACTION_TYPES.iTransactionService)
    transactionService: ITransactionService,
  ) {
    this.transactionService = transactionService;
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.transactionService.create();

      res.status(200).json({
        ...data
      });
    } catch (e) {
      next(e);
    }
  };
  
  public getTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { validatedData } = req as IValidatedRequest<TGetTransaction>;
      const data = await this.transactionService.getTransaction(validatedData);

      res.status(200).json({
        ...data
      });
    } catch (e) {
      next(e);
    }
  };

  
  public getTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.transactionService.getTransactions();

      res.status(200).json({
        ...data
      });
    } catch (e) {
      next(e);
    }
  };
}
