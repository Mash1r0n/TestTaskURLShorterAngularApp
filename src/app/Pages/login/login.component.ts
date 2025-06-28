import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { LoginModel } from '../../Models/LoginModel';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLoginSubmit() {
    const loginModel: LoginModel = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.authService.login(loginModel).subscribe({
      next: (response) => {
        if (response.token) {
          this.router.navigate([AppRouterDefinitions.ShortUrls]);
        } else {
          this.loginError = 'Login failed: no token received';
        }
      },
      error: (err) => {
        console.error('Login error:', err);

        if (Array.isArray(err.error)) {
          this.loginError = err.error.map((e: any) => e.description).join('\n');
        } else if (typeof err.error === 'string') {
          this.loginError = err.error;
        } else if (err.error?.message) {
          this.loginError = err.error.message;
        } else {
          this.loginError = 'An error occurred during login';
        }
      }
    });
  }
}
