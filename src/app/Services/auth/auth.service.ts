import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginModel } from '../../Models/LoginModel';
import { RegisterModel } from '../../Models/RegisterModel';
import { LoginResponseModel } from '../../Models/LoginResponseModel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loginUrl = 'https://localhost:7290/User/login';
  private readonly registerUrl = 'https://localhost:7290/User/register';

  constructor(private readonly http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  login(model: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(this.loginUrl, model).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  register(model: RegisterModel): Observable<void> {
    return this.http.post<void>(this.registerUrl, model);
  }
}