import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service'; // путь скорректируй под себя
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppRouterDefinitions  } from '../../RouterDefinitions/app.router.definitions'

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  standalone: true,
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  dropdownOpen = false;
  public AppRouterDefinitions = AppRouterDefinitions;

  constructor(private readonly auth: AuthService, public router: Router) {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  getUserEmail(): string {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user).email : 'User';
  }

  logout() {
    this.auth.logout();
    this.dropdownOpen = false;
    this.router.navigate([AppRouterDefinitions.Login]);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
