import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/users';
  private http = inject(HttpClient);

  constructor() {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.userUrl}/roles`);
  }

  getUsuarioByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/findByUsername/${username}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`);
  }
}
