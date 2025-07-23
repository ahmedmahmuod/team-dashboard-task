import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/analytics', pathMatch: 'full'},
  { path: 'dashboard/analytics', loadComponent: () => import('./features/dashboard/analytics/components/analytics.component').then(m => m.AnalyticsDashboardComponent)},
  { path: 'dashboard/teams', loadComponent: () => import('./features/dashboard/team/components/team-page.component').then(m => m.TeamPageComponent)},
  {path: '**', redirectTo: '/dashboard/analytics'}
];