import 'reflect-metadata';

import { Container } from 'inversify';

import transactionBind from './inversify/Transaction.config';

const iocContainer = new Container();
transactionBind(iocContainer);

export default iocContainer;
