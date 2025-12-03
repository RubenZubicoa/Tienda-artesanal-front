import { Routes } from '@angular/router';

export const myProductsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/my-products/my-products.component').then(m => m.MyProductsComponent)
    }
]   