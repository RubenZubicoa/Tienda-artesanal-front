import { Routes } from '@angular/router';

export const carritoRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/carrito/carrito.component').then(m => m.CarritoComponent)
    },
    {
        path: 'complete-order',
        loadComponent: () => import('./pages/complete-order/complete-order.component').then(m => m.CompleteOrderComponent),
        data: {
            breadcrumb: 'Completar pedido',
        },
    }
]