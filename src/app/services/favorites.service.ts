import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Serie } from '../models/interfaces/serie';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8080/api/favorites';
  private seriesApiUrl = 'http://localhost:8080/api/series';
  private http = inject(HttpClient);

  addFavorite(favoriteData: { seriesTitle: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, favoriteData);
  }

  getFavoritesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/id/${userId}`);
  }

  removeFavorite(seriesId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${seriesId}`);
  }

  getSerieById(seriesId: number): Observable<Serie> {
    return this.http.get<Serie>(`${this.seriesApiUrl}/${seriesId}`);
  }

  getFavoritesWithSeries(userId: number): Observable<Serie[]> {
    return this.getFavoritesByUserId(userId).pipe(
      switchMap((favorites) =>
        this.http
          .get<Serie[]>(this.seriesApiUrl)
          .pipe(
            map((allSeries) =>
              favorites
                .map((favorite) =>
                  allSeries.find((serie) => serie.id === favorite.seriesId)
                )
                .filter((serie): serie is Serie => !!serie)
            )
          )
      )
    );
  }
}
