import { Routes } from '@angular/router';

export const carritoRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/carrito/carrito.component').then(m => m.CarritoComponent)
    }
]