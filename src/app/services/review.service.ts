import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Review } from '../models/interfaces/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewUrl = 'http://localhost:8080/api/reviews';
  private http = inject(HttpClient);

  constructor() {}

  getReviews() {
    return this.http.get<Review[]>(this.reviewUrl);
  }

  getReviewsBySeries(seriesId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewUrl}/series/${seriesId}`);
  }

  deleteReview(id: number) {
    return this.http.delete<void>(`${this.reviewUrl}/${id}`);
  }

  createReview(reviewData: any): Observable<any> {
    return this.http.post<any>(this.reviewUrl, reviewData);
  }
}
