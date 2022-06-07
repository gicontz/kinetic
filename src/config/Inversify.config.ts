import 'reflect-metadata';

import { Container } from 'inversify';

import swaggerBind from './inversify/Swagger.config';
import cashbackBind from './inversify/Cashback.config';
import rulesetBind from './inversify/Ruleset.config';
import transactionBind from './inversify/Transaction.config';

const iocContainer = new Container();
swaggerBind(iocContainer);
cashbackBind(iocContainer);
rulesetBind(iocContainer);
transactionBind(iocContainer);

export default iocContainer;
