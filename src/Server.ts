import express from 'express';

import App from '@app/App';
import config from '@config/Config';
import database from '@database/Database';
import errorMiddleware from '@middlewares/ErrorMiddleware';
import iocContainer from '@config/Inversify.config';

import {
  TRANSACTION_TYPES,
  ITransactionRouter,
} from '@apis/transaction/Transaction.ioc';


const app = new App({
  port: config.app.PORT,
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
  ],
  routers: [
    iocContainer.get<ITransactionRouter>(TRANSACTION_TYPES.iTransactionRouter),
  ],
  errorMiddlewares: [errorMiddleware],
});

database.connect(() => {
  app.listen();
});
