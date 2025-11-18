import { Routes } from '@angular/router';
import { manufacturerResolver } from './manufacturer.resolver';

export const manufacturersRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/manufacturers/manufacturers.component').then(m => m.ManufacturersComponent)
    },
    {
        path: ':manufacturerId',
        loadComponent: () => import('./pages/manufacturers-details/manufacturers-details.component').then(m => m.ManufacturersDetailsComponent),
        resolve: {
            manufacturer: manufacturerResolver
        },
        data: {
            breadcrumb: 'Detalles del vendedor',
        },
    }
]