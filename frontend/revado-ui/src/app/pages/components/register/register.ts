import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!confirm) return null;
  return password === confirm ? null : { mismatch: true };
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, 
    InputTextModule, PasswordModule, ButtonModule,RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  constructor(private authService: AuthService, private router: Router) {}
  registerForm = new FormGroup(
    {
      fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    },
    { validators: passwordMatchValidator }
  );

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    this.registerForm.markAllAsTouched(); 
    if (this.registerForm.invalid) return;
    const { fullName, email, password } = this.registerForm.getRawValue();
this.authService.registerUser(fullName, email, password).subscribe({
    next: () => {
    this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error("Registration failed", err);
    }
});
  }}