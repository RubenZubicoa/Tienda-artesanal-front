import { Routes } from '@angular/router';
import { meetingPointResolver } from './meeting-points.resolver';

export const meetingPointsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/meeting-points/meeting-points.component').then(m => m.MeetingPointsComponent),
    },
    {
        path: 'add-meeting-point',
        loadComponent: () => import('./pages/add-meeting-point/add-meeting-point.component').then(m => m.AddMeetingPointComponent),
        data: {
            breadcrumb: 'Agregar punto de encuentro',
        },
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/add-meeting-point/add-meeting-point.component').then(m => m.AddMeetingPointComponent),
        data: {
            breadcrumb: 'Editar punto de encuentro',
        },
        resolve: {
            meetingPoint: meetingPointResolver,
        },
    }
]