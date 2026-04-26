import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'bharatanatyam-levels',
    loadChildren: () => import('./pages/bharatanatyam-levels/bharatanatyam-levels.module').then(m => m.BharatanatyamLevelsModule)
  },
  {
    path: 'adavus',
    loadChildren: () => import('./pages/adavus/adavus.module').then(m => m.AdavusModule)
  },
  {
    path: 'margam',
    loadChildren: () => import('./pages/margam/margam.module').then(m => m.MargamModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'fees',
    loadChildren: () => import('./pages/fees/fees.module').then(m => m.FeesModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'vision',
    loadChildren: () => import('./pages/vision/vision.module').then(m => m.VisionModule)
  },
  {
    path: 'about-guru',
    loadChildren: () => import('./pages/about-guru/about-guru.module').then(m => m.AboutGuruModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
