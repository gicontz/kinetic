export type TItemOrder = {
  itemId: string;
  qty: number;
};

export interface IOrder {
  orderId: string;
  items: TItemOrder[];
  totalQty: number;
  totalAmt: number;
}

export type TCreateOrderData = {
  items: TItemOrder[];
};

export type TUpdateOrderData = {
  orderId: string;
  items: TItemOrder[];
};

export type TDeleteOrderData = {
  orderId: string;
};

export type TGetOrderData = {
  orderId: string;
};

export type TGetOrderListData = {
  qty?: number;
  createdDate?: string;
};
