import { Routes } from "@angular/router";

export const analysisRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/analysis/analysis.component').then(m => m.AnalysisComponent),
  },
];