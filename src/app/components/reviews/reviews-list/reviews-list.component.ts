import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Input } from '@angular/core';
import { Review } from '../../../models/interfaces/review';
import { Serie } from '../../../models/interfaces/serie';
import { ReviewService } from '../../../services/review.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SeriesService } from '../../../services/series.service';
import { FormsModule } from '@angular/forms';
import { ReviewsCardComponent } from '../reviews-card/reviews-card.component';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReviewsCardComponent
  ],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css',
})
export class ReviewsListComponent implements OnInit {
  @Input() onlyUserReviews: boolean = false;

  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  seriesList: Serie[] = [];
  loading = true;
  errorMessage = '';
  isFiltered = false;

  userFilter: string = '';
  seriesFilter: string = '';

  private reviewService = inject(ReviewService);
  private seriesService = inject(SeriesService);
  private authService = inject(AuthService);
  private router = inject(Router);

  username: string | null = null;

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.loadReviews();
    this.loadSeries();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;

        if (this.onlyUserReviews && this.username) {
          this.reviews = this.reviews.filter(review => review.username === this.username);
        }

        this.filteredReviews = this.reviews;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las reseñas';
        this.loading = false;
      },
    });
  }

  loadSeries() {
    this.seriesService.getAllSeries().subscribe({
      next: (data) => {
        this.seriesList = data;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las series';
      },
    });
  }

  filterReviews() {
    this.filteredReviews = this.reviews.filter((review) => {
      const matchesUser =
        !this.userFilter ||
        review.username.toLowerCase().includes(this.userFilter.toLowerCase());

      const matchesSeries =
        !this.seriesFilter ||
        review.seriesTitle.toLowerCase() === this.seriesFilter.toLowerCase();

      return matchesUser && matchesSeries;
    });

    this.isFiltered = !!(this.userFilter || this.seriesFilter);
  }

  addReview() {
    this.router.navigate(['/reviews/add']);
  }
}
