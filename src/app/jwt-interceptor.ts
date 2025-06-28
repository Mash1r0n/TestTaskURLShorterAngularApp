// jwt-interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http'; // Type for typing, optional
import { AuthService } from './Services/auth/auth.service';
import { switchMap } from 'rxjs';
import { ApiRouterDefinitions } from './RouterDefinitions/api.router.definitions';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const PROTECTED_ENDPOINTS: string[] = [
    ApiRouterDefinitions.AddNewShortUrlAPI,
  ];

  const isProtectedUrl = PROTECTED_ENDPOINTS.some(endpoint => req.url.includes(endpoint));

  if (!isProtectedUrl) {
    return next(req);
  }

  return auth.getValidAccessToken().pipe(
    switchMap(token => {
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        console.log('JWT Interceptor: Added Authorization header with token');
        console.log('JWT Interceptor: Request URL:', req.url);
        console.log('JWT Interceptor:', token);
      }
      return next(req);
    })
  );
};