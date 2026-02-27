import { Routes } from '@angular/router';

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
    }
]