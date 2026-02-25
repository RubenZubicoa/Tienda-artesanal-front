import { Routes } from '@angular/router';
import { productResolver } from '../products/products.resolver';

export const myProductsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/my-products/my-products.component').then(m => m.MyProductsComponent),
    },
    {
        path: 'add-product',
        loadComponent: () => import('./pages/add-product/add-product.component').then(m => m.AddProductComponent),
        data: {
            breadcrumb: 'Agregar producto',
        },
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/add-product/add-product.component').then(m => m.AddProductComponent),
        data: {
            breadcrumb: 'Editar producto',
        },
        resolve: {
            product: productResolver,
        },
    }
]   