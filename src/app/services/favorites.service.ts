import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serie } from '../models/interfaces/serie';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8080/api/favorites';
  private http = inject(HttpClient);

  addFavorite(favoriteData: { seriesTitle: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, favoriteData);
  }

  getFavoritesByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${username}`);
  }
  

  removeFavorite(seriesId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${seriesId}`);
  }
}
