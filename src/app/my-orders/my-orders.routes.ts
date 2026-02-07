import { Routes } from '@angular/router';
import { orderDetailsResolver } from '../orders/order-details.resolver';

export const myOrdersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent),
  },
  {
    path: ':orderId',
    loadComponent: () => import('./pages/my-orders-details/my-orders-details.component').then(m => m.MyOrdersDetailsComponent),
    resolve: {
      order: orderDetailsResolver,
    },
    data: {
      breadcrumb: 'Detalles de mis pedidos',
    }
  }
]