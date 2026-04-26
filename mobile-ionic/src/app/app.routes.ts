import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./pages/schedule/schedule.page').then(m => m.SchedulePage)
  },
  {
    path: 'book-class',
    loadComponent: () => import('./pages/book-class/book-class.page').then(m => m.BookClassPage)
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./pages/my-bookings/my-bookings.page').then(m => m.MyBookingsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }
];
