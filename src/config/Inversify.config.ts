import 'reflect-metadata';

import { Container } from 'inversify';

import swaggerBind from './inversify/Swagger.config';
import transactionBind from './inversify/Transaction.config';

const iocContainer = new Container();
swaggerBind(iocContainer);
transactionBind(iocContainer);

export default iocContainer;
