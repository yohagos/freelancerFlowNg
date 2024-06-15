import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component').then(mod => mod.LoginComponent),
    canActivate: [authGuard]
  },
  {
    path: 'recruiter',
    loadChildren: () => import('./features/recruiters/recruiter.routes').then(mod => mod.routes),
    canActivate: [authGuard]
  },
  {
    path: 'contract',
    loadChildren: () => import('./features/contracts/contract.routes').then(mod => mod.routes),
    canActivate: [authGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./features/client/client.routes').then(mod => mod.routes),
    canActivate: [authGuard]
  },
  {
    path: 'project',
    loadChildren: () => import('./features/project/project.routes').then(mod => mod.routes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
