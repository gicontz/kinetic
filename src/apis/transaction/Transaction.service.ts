import { injectable, inject } from 'inversify';

import NotFoundError from '@errors/NotFoundError';

import {
  TRANSACTION_TYPES,
  ITransactionService,
  ITransactionDao,
} from './Transaction.ioc';

import {
  TGetTransaction,
  TCreateTransaction,
  ITransaction
} from './Transaction.data';

@injectable()
export default class TransactionService implements ITransactionService {
  private transactionDao: ITransactionDao;

  constructor(@inject(TRANSACTION_TYPES.iTransactionDao) transactionDao: ITransactionDao) {
    this.transactionDao = transactionDao;
  }

  public create = async (data: TCreateTransaction) => {
    const transaction = this.transactionDao.create(data);
    return transaction;
  };

  public getTransaction = async (data: TGetTransaction) => {
    const transaction = this.transactionDao.findById(data.id);
    if (transaction == null) {
      throw new NotFoundError('Transaction data not found.');
    }

    return transaction;
  };

  public getTransactions = async () => {
    const transactionList = this.transactionDao.find();

    return transactionList;
  };
}
