import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { LoginModel } from '../../Models/LoginModel';
import { RegisterModel } from '../../Models/RegisterModel';
import { LoginResponseModel } from '../../Models/LoginResponseModel';
import { ApiRouterDefinitions } from '../../RouterDefinitions/api.router.definitions';

interface JwtPayload {
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private readonly http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getToken$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  clearAuthData(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const valid = this.isTokenValid(token);
    if (!valid) this.clearAuthData();

    return valid;
  }

  getValidAccessToken(): Observable<string | null> {
    const token = this.getToken();
    if (!token || !this.isTokenValid(token)) {
      this.clearAuthData();
      return of(null);
    }
    return of(token);
  }

  logout(): void {
    this.clearAuthData();
  }

  login(model: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(ApiRouterDefinitions.LoginUrlAPI, model).pipe(
      tap(res => this.setToken(res.token)),
      tap(res =>
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: model.email,
            userId: res.userId,
            isUserAdmin: res.isUserAdmin
          })
        )
      )
    );
  }

  register(model: RegisterModel): Observable<void> {
    return this.http.post<void>(ApiRouterDefinitions.RegisterUrlAPI, model);
  }
}