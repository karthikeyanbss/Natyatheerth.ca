import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form: FormGroup;
  submitting = false;
  success = '';
  error = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      phone:   [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';
    this.api.sendContact(this.form.value).subscribe({
      next: () => {
        this.success = 'Thank you! Your message has been sent. We will get back to you soon.';
        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.error = 'Something went wrong. Please email us directly at sruthig@natyatheerth.com';
        this.submitting = false;
      }
    });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }
}
