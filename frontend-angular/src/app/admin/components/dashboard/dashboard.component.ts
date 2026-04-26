import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = { students: 0, classes: 0, bookings: 0 };
  loading = true;

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    Promise.all([
      firstValueFrom(this.api.getStudents()),
      firstValueFrom(this.api.getClasses()),
      firstValueFrom(this.api.getBookings())
    ]).then(([students, classes, bookings]) => {
      this.stats.students = students?.length ?? 0;
      this.stats.classes  = classes?.length ?? 0;
      this.stats.bookings = bookings?.length ?? 0;
      this.loading = false;
    }).catch(() => { this.loading = false; });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
