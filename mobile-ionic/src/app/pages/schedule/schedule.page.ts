import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonBadge, IonRefresher, IonRefresherContent, IonSpinner,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { environment } from '../../../environments/environment';

interface ClassItem {
  id?: string;
  name: string;
  level: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  mode: string;
  description: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
    IonLabel, IonBadge, IonRefresher, IonRefresherContent, IonSpinner,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ],
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss']
})
export class SchedulePage implements OnInit {
  classes: ClassItem[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.loadClasses(); }

  loadClasses(): void {
    this.loading = true;
    this.http.get<ClassItem[]>(`${environment.apiUrl}/classes`).subscribe({
      next: (data) => { this.classes = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  doRefresh(event: any): void {
    this.loadClasses();
    setTimeout(() => event.target.complete(), 1500);
  }
}
