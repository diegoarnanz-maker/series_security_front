import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/api/users';
  private http = inject(HttpClient);

  constructor() { }
  getUsuarioByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/findByUsername/${username}`);
  };
}
