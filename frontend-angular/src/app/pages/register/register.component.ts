import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  step = 1;
  totalSteps = 3;
  submitting = false;
  success = false;
  error = '';

  step1Form!: FormGroup;
  step2Form!: FormGroup;

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Flexible'];
  times = ['Morning (9am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–8pm)', 'Flexible'];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      age:       ['', [Validators.required, Validators.min(5), Validators.max(80)]],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', Validators.required],
      address:   ['', Validators.required],
      mode:      ['in_person', Validators.required]
    });

    this.step2Form = this.fb.group({
      classType:     ['group', Validators.required],
      level:         ['', Validators.required],
      preferredDay:  ['', Validators.required],
      preferredTime: ['', Validators.required],
      notes:         ['']
    });
  }

  nextStep(): void {
    if (this.step === 1) {
      this.step1Form.markAllAsTouched();
      if (this.step1Form.invalid) return;
    }
    if (this.step === 2) {
      this.step2Form.markAllAsTouched();
      if (this.step2Form.invalid) return;
    }
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  submit(): void {
    this.submitting = true;
    this.error = '';
    const payload = { ...this.step1Form.value, ...this.step2Form.value };
    this.api.register(payload).subscribe({
      next: () => {
        this.success = true;
        this.submitting = false;
      },
      error: () => {
        this.error = 'Registration failed. Please try again or email sruthig@natyatheerth.com';
        this.submitting = false;
      }
    });
  }

  hasError(form: FormGroup, field: string, error: string): boolean {
    const ctrl = form.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }

  get s1(): { [key: string]: AbstractControl } { return this.step1Form.controls; }
  get s2(): { [key: string]: AbstractControl } { return this.step2Form.controls; }
}
