import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { StudentsComponent } from './components/students/students.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ClassesComponent,
    BookingsComponent,
    StudentsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule]
})
export class AdminModule {}
