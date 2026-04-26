import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      this.api.getStudents().toPromise(),
      this.api.getClasses().toPromise(),
      this.api.getBookings().toPromise()
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
