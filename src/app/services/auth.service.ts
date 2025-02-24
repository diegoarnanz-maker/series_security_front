import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          const userData = {
            username: credentials.username,
            password: credentials.password,
            roles: response.roles,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          return this.userService.getUsuarioByUsername(credentials.username);
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Error al iniciar sesión'));
        })
      );
  
  }
}