import { Container } from 'inversify';

import {
  TRANSACTION_TYPES,
  ITransactionRouter,
  ITransactionValidator,
  ITransactionController,
  ITransactionService,
  ITransactionDao,
} from '@apis/transaction/Transaction.ioc';
import TransactionRouter from '@apis/transaction/Transaction.router.ts';
import TransactionValidator from '@apis/transaction/Transaction.validator';
import TransactionController from '@apis/transaction/Transaction.controller';
import TransactionService from '@apis/transaction/Transaction.service';
import TransactionDao from '@daos/transaction/Transaction.dao';

export default (iocContainer: Container) => {
  iocContainer
    .bind<ITransactionRouter>(TRANSACTION_TYPES.iTransactionRouter)
    .to(TransactionRouter);
  iocContainer
    .bind<ITransactionValidator>(TRANSACTION_TYPES.iTransactionValidator)
    .to(TransactionValidator);
  iocContainer
    .bind<ITransactionController>(TRANSACTION_TYPES.iTransactionController)
    .to(TransactionController);
  iocContainer
    .bind<ITransactionService>(TRANSACTION_TYPES.iTransactionService)
    .to(TransactionService);
  iocContainer
    .bind<ITransactionDao>(TRANSACTION_TYPES.iTransactionDao)
    .to(TransactionDao);
};
