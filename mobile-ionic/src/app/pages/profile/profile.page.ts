import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title style="color:#D4AF37">Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div style="text-align:center;padding:3rem;color:#8B1A1A">
        <h2>My Profile</h2>
        <p>Please log in to view your profile.</p>
      </div>
    </ion-content>
  `
})
export class ProfilePage {}
