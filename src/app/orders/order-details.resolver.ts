import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrdersService } from './services/orders.service';
import { Order } from '../core/models/Order';

export const orderDetailsResolver: ResolveFn<Order> = (route, state) => {
  const orderId = route.params['orderId'];
  return inject(OrdersService).getOrder(orderId);
};
