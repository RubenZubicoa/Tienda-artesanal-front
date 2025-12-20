import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { Order, OrderDB, mapOrderToOrder } from '../../core/models/Order';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.ORDERS_URL;

  getOrders(): Observable<Order[]> {
    return this.http.get<OrderDB[]>(this.url).pipe(map(orders => orders.map(mapOrderToOrder)));
  }

  createOrder(order: Order): Observable<void> {
    return this.http.post<void>(this.url, order);
  }

  updateOrder(order: Order): Observable<void> {
    return this.http.put<void>(this.url, order);
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(this.url + '/' + orderId);
  }
}
