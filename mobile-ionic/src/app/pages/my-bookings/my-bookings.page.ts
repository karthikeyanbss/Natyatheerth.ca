import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title style="color:#D4AF37">My Bookings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div style="text-align:center;padding:3rem;color:#8B1A1A">
        <h2>My Bookings</h2>
        <p>Please log in to view your bookings.</p>
      </div>
    </ion-content>
  `
})
export class MyBookingsPage {}
