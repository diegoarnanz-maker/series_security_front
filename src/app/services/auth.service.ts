import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private http = inject(HttpClient);

  private userSubject = new BehaviorSubject<any>(this.loadUserFromStorage());

  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          const userData = {
            username: username,
            password: password,
            roles: response.roles,
          };

          localStorage.setItem('user', JSON.stringify(userData));
          this.userSubject.next(userData);
        }),
        catchError((error) => {
          console.error('❌ Error en login:', error);
          return throwError(() => new Error('Error al iniciar sesión'));
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.loadUserFromStorage();
  }

  getUserRole(): string | null {
    const user = this.loadUserFromStorage();
    return user ? user.roles[0] : null;
  }

  getUsername(): string | null {
    const user = this.loadUserFromStorage();
    return user ? user.username : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  private loadUserFromStorage(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
