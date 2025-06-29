import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { RegisterModel } from '../../Models/RegisterModel';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerEmail = '';
  registerPassword = '';
  registerErrors: string[] = [];

  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router) {}

  onRegisterSubmit() {
    const loginModel: RegisterModel = {
      email: this.registerEmail,
      password: this.registerPassword
    };

    this.registerErrors = [];

    this.authService.register(loginModel).subscribe({
      next: () => {
        this.router.navigate([AppRouterDefinitions.Login]);
      },
      error: (err) => {
        console.error('Register error:', err);

        if (Array.isArray(err.error)) {
          this.registerErrors = err.error.map((e: any) => e.description);
        } 
        else if (typeof err.error === 'string') {
          this.registerErrors = [err.error];
        } 
        else if (err.error?.message) {
          this.registerErrors = [err.error.message];
        } 
        else {
          this.registerErrors = ['An error occurred during registration'];
        }
      }
    });
  }
}
