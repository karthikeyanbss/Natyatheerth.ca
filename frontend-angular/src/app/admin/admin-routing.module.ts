import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { StudentsComponent } from './components/students/students.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'login',     component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'classes',   component: ClassesComponent,   canActivate: [authGuard] },
  { path: 'bookings',  component: BookingsComponent,  canActivate: [authGuard] },
  { path: 'students',  component: StudentsComponent,  canActivate: [authGuard] },
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
