import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginModel } from '../../Models/LoginModel';
import { RegisterModel } from '../../Models/RegisterModel';
import { LoginResponseModel } from '../../Models/LoginResponseModel';
import { ApiRouterDefinitions } from '../../RouterDefinitions/api.router.definitions';

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

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');

    this.tokenSubject.next(null);
  }

  login(model: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(ApiRouterDefinitions.LoginUrlAPI, model).pipe(
      tap(res => console.log('Login response:', res)),
      tap(res => this.setToken(res.token)),
      tap(res => localStorage.setItem('user', JSON.stringify({ "email": model.email, "userId": res.userId, "isUserAdmin": res.isUserAdmin })))
    );
  }

  register(model: RegisterModel): Observable<void> {
    return this.http.post<void>(ApiRouterDefinitions.RegisterUrlAPI, model);
  }

  getValidAccessToken(): Observable<string | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    //TODO: Add functionality to clear or refresh token after expiration
    return of(token);
  }
}
