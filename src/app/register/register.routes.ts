import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    }
]