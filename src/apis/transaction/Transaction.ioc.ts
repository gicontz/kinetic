import { Router, Request, Response, NextFunction } from 'express';

import {
  ITransaction, TCreateTransaction, TGetTransaction
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
  create: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
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
  create: (data: TCreateTransaction) => Promise<ITransaction>;
  getTransaction: (data: TGetTransaction) => Promise<ITransaction | null>;
  getTransactions: () => Promise<ITransaction[]>;
}

export interface ITransactionDao {
  create: (data: TCreateTransaction) => Promise<ITransaction>;
  findById: (id: number) => Promise<ITransaction | null>;
  find: () => Promise<ITransaction[]>;
}
