import { Routes } from '@angular/router';

export const meetingPointsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/meeting-points/meeting-points.component').then(m => m.MeetingPointsComponent),
    }
]