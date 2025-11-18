import { Routes } from '@angular/router';
import { manufacturerResolver } from './manufacturers/manufacturer.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'manufacturers',
        loadComponent: () => import('./manufacturers/pages/manufacturers/manufacturers.component').then(m => m.ManufacturersComponent),
    },
    {
        path: 'manufacturers/:manufacturerId',
        loadComponent: () => import('./manufacturers/pages/manufacturers-details/manufacturers-details.component').then(m => m.ManufacturersDetailsComponent),
        resolve: {
            manufacturer: manufacturerResolver
        }
    },
    {
        path: 'products',
        loadComponent: () => import('./products/pages/products/products.component').then(m => m.ProductsComponent)
    }
];
