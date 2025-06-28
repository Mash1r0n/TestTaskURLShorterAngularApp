import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { AppRouterDefinitions } from '../../RouterDefinitions/app.router.definitions';

export const redirectIfAuth = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();

  if (isAuth) {
    router.navigate([AppRouterDefinitions.ShortUrls]);
    return of(false);
  }

  return of(true);
};