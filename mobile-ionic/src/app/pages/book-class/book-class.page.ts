import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonButton, IonToast, IonNote
} from '@ionic/angular/standalone';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-class',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, IonButton, IonToast, IonNote
  ],
  templateUrl: './book-class.page.html',
  styleUrls: ['./book-class.page.scss']
})
export class BookClassPage {
  form = {
    firstName: '', lastName: '', age: '', email: '', phone: '',
    mode: 'in_person', level: '', classType: 'group'
  };
  submitting = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  constructor(private http: HttpClient) {}

  submit(): void {
    this.submitting = true;
    this.http.post(`${environment.apiUrl}/register`, this.form).subscribe({
      next: () => {
        this.toastMessage = '🌸 Registration received! We will contact you within 48 hours.';
        this.toastColor = 'success';
        this.showToast = true;
        this.form = { firstName:'', lastName:'', age:'', email:'', phone:'', mode:'in_person', level:'', classType:'group' };
        this.submitting = false;
      },
      error: () => {
        this.toastMessage = 'Registration failed. Please email sruthi@natyatheerth.com';
        this.toastColor = 'danger';
        this.showToast = true;
        this.submitting = false;
      }
    });
  }
}
