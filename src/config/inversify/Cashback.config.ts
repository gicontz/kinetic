import { Container } from 'inversify';

import {
  CASHBACK_TYPES,
  ICashbackRouter,
  ICashbackController,
  ICashbackService,
} from '@apis/cashback/Cashback.ioc';
import CashbackRouter from '@apis/cashback/Cashback.router';
import CashbackController from '@apis/cashback/Cashback.controller';
import CashbackService from '@apis/cashback/Cashback.service';

export default (iocContainer: Container) => {
  iocContainer
    .bind<ICashbackRouter>(CASHBACK_TYPES.iCashbackRouter)
    .to(CashbackRouter);
  iocContainer
    .bind<ICashbackController>(CASHBACK_TYPES.iCashbackController)
    .to(CashbackController);
  iocContainer
    .bind<ICashbackService>(CASHBACK_TYPES.iCashbackService)
    .to(CashbackService);
};
