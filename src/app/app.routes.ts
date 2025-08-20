import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/entrar', pathMatch: 'full' },
  {
    path: 'entrar',
    loadComponent: () => import('@utils/login/login').then((m) => m.Login),
  },
  {
    path: 'registrar',
    loadComponent: () => import('@utils/register/register').then((m) => m.Register),
  }
];
