import express from 'express';
import cors from 'cors';

import App from '@app/App';
import config from '@config/Config';
import database from '@database/Database';
import errorMiddleware from '@middlewares/ErrorMiddleware';
import iocContainer from '@config/Inversify.config';

import {
  CASHBACK_TYPES,
  ICashbackRouter,
} from '@apis/cashback/Cashback.ioc';
import {
  RULESET_TYPES,
  IRulesetRouter,
} from '@apis/ruleset/Ruleset.ioc';
import {
  TRANSACTION_TYPES,
  ITransactionRouter,
} from '@apis/transaction/Transaction.ioc';
import { ISwaggerRouter, SWAGGER_TYPES } from '@apis/swagger/Swagger.ioc';

const whiteList = config.app.WHITELIST;

const app = new App({
  port: config.app.PORT,
  middlewares: [express.json(), express.urlencoded({ extended: true }),
    cors({
      origin: (origin, callback) => {
        const org = origin || 'invalid';
        // undefined origin means from this API's domain
        if (whiteList.indexOf(org) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by Cors'));
        }
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  ],
  routers: [
    iocContainer.get<ISwaggerRouter>(SWAGGER_TYPES.iSwaggerRouter),
    iocContainer.get<ICashbackRouter>(CASHBACK_TYPES.iCashbackRouter),
    iocContainer.get<IRulesetRouter>(RULESET_TYPES.iRulesetRouter),
    iocContainer.get<ITransactionRouter>(TRANSACTION_TYPES.iTransactionRouter),
  ],
  errorMiddlewares: [errorMiddleware],
});

database.connect(() => {
  app.listen();
});
