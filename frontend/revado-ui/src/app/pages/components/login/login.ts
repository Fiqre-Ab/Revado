import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  emailPattern = '^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}$';
  constructor(private authService: AuthService, private router: Router) {}
 onSubmit(form: any) {
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = "Invalid email or password";
        }
      });
    }
  }
}

