import { injectable, inject } from 'inversify';

import NotFoundError from '@errors/NotFoundError';

import { ORDER_TYPES, IOrderService, IOrderDao } from './Order.ioc';

import {
  TCreateOrderData,
  TGetOrderData,
  TGetOrderListData,
  TUpdateOrderData,
  TDeleteOrderData,
} from './Order.data';

@injectable()
export default class OrderService implements IOrderService {
  private orderDao: IOrderDao;

  constructor(@inject(ORDER_TYPES.iOrderDao) orderDao: IOrderDao) {
    this.orderDao = orderDao;
  }

  public createOrder = async (data: TCreateOrderData) => {
    const order = await this.orderDao.createOrder(data);
    return order;
  };

  public getOrder = async (data: TGetOrderData) => {
    const order = await this.orderDao.getOrder(data);
    if (order == null) {
      throw new NotFoundError('EMS data not found.');
    }

    return order;
  };

  public getOrderList = async (data: TGetOrderListData) => {
    const orderList = await this.orderDao.getOrderList(data);

    return orderList;
  };

  public updateOrder = async (data: TUpdateOrderData) => {
    const { orderId } = data;

    const order = await this.orderDao.getOrder({ orderId });
    if (order == null) {
      throw new NotFoundError('Order data not found.');
    }

    await this.orderDao.updateOrder(data);
  };

  public deleteOrder = async (data: TDeleteOrderData) => {
    const { orderId } = data;

    const order = await this.orderDao.getOrder({ orderId });
    if (order == null) {
      throw new NotFoundError('Order data not found.');
    }

    await this.orderDao.deleteOrder(data);
  };
}
