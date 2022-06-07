import { Router, Request, Response, NextFunction } from 'express';

import {
  ICashback,
} from './Cashback.data';

export const CASHBACK_TYPES = {
  iCashbackRouter: Symbol.for('ICashbackRouter'),
  iCashbackValidator: Symbol.for('ICashbackValidator'),
  iCashbackController: Symbol.for('ICashbackController'),
  iCashbackService: Symbol.for('ICashbackService'),
  iCashbackDao: Symbol.for('ICashbackDao'),
};

export interface ICashbackRouter {
  path: string;
  router: Router;
}

export interface ICashbackController {
  getCashback: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export interface ICashbackService {
  getCashback: () => Promise<ICashback[] | null>;
}
