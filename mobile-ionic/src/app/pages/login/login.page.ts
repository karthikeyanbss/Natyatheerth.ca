import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title style="color:#D4AF37">Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div style="padding:2rem">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input [(ngModel)]="email" type="email" placeholder="your@email.com"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input [(ngModel)]="password" type="password" placeholder="••••••••"></ion-input>
        </ion-item>
        <div style="padding:1rem">
          <ion-button expand="block" color="danger">Sign In</ion-button>
        </div>
      </div>
    </ion-content>
  `
})
export class LoginPage {
  email = '';
  password = '';
}
