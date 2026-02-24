import { Routes } from '@angular/router';
import { manufacturerGuard } from './core/guards/manufacturer.guard';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    data: {
      breadcrumb: 'Inicio',
    },
  },
  {
    path: 'manufacturers',
    loadChildren: () => import('./manufacturers/manufacturers.routes').then(m => m.manufacturersRoutes),
    data: {
      breadcrumb: 'sections.artesanos.title',
    },
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then((m) => m.productsRoutes),
    data: {
      breadcrumb: 'sections.productos.title',
    },
  },

  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.routes').then(m => m.carritoRoutes),
    data: {
      breadcrumb: 'layout.cart',
    },
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.routes').then(m => m.registerRoutes),
    data: {
      breadcrumb: 'layout.register',
    },
  },
  {
    path: 'my-products',
    loadChildren: () => import('./my-products/my-products.routes').then(m => m.myProductsRoutes),
    data: {
      breadcrumb: 'layout.my-products.title',
    },
    canActivate: [manufacturerGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.routes').then(m => m.ordersRoutes),
    data: {
      breadcrumb: 'layout.orders.title',
    },
    canActivate: [manufacturerGuard],
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.routes').then(m => m.myOrdersRoutes),
    data: {
      breadcrumb: 'layout.my-orders.title',
    },
    canActivate: [userGuard],
  },
  {
    path: 'meeting-points',
    loadChildren: () => import('./meeting-points/meeting-points.routes').then(m => m.meetingPointsRoutes),
    data: {
      breadcrumb: 'layout.meeting-points.title',
    },
    canActivate: [manufacturerGuard],
  },
  // {
  //   path: 'analysis',
  //   loadChildren: () => import('./analysis/analysis.routes').then(m => m.analysisRoutes),
  //   data: {
  //     breadcrumb: 'Análisis',
  //   },
  // },
];
