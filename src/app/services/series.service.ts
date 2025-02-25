import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/interfaces/serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'http://localhost:8080/api/series';
  private http = inject(HttpClient);

  constructor() {}

  getAllSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  getSerieById(id: number): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/${id}`);
  }

  getSeriesByGenre(genre: string): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/genre/${genre}`);
  }

  getSeriesByRating(rating: number): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/rating/${rating}`);
  }

  addSerie(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.apiUrl, serie);
  }

  updateSerie(id: number, serie: Serie): Observable<Serie> {
    return this.http.put<Serie>(`${this.apiUrl}/${id}`, serie);
  }

  deleteSerie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
