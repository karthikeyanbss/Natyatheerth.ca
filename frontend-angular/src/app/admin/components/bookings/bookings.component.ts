import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Booking } from '../../../models';

@Component({
  selector: 'app-admin-bookings',
  standalone: false,
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getBookings().subscribe({
      next: (data) => { this.bookings = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  updateStatus(id: string, status: string): void {
    this.api.updateBookingStatus(id, status).subscribe({
      next: (updated) => {
        const idx = this.bookings.findIndex(b => b.id === id);
        if (idx > -1) this.bookings[idx] = updated;
      }
    });
  }
}
