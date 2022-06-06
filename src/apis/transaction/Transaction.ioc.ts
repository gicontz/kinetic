import { Router, Request, Response, NextFunction } from 'express';

import {
  ITransaction, TGetTransaction
} from './Transaction.data';

export const TRANSACTION_TYPES = {
  iTransactionRouter: Symbol.for('ITransactionRouter'),
  iTransactionValidator: Symbol.for('ITransactionValidator'),
  iTransactionController: Symbol.for('ITransactionController'),
  iTransactionService: Symbol.for('ITransactionService'),
  iTransactionDao: Symbol.for('ITransactionDao'),
};

export interface ITransactionRouter {
  path: string;
  router: Router;
}

export interface ITransactionValidator {
  getTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface ITransactionController {
  create: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  getTransaction: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getTransactions: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export interface ITransactionService {
  create: () => Promise<ITransaction>;
  getTransaction: (data: TGetTransaction) => Promise<ITransaction>;
  getTransactions: () => Promise<ITransaction[]>;
}

export interface ITransactionDao {
  create: () => Promise<ITransaction>;
  findById: (id: number) => Promise<ITransaction>;
  find: () => Promise<ITransaction[]>;
}
