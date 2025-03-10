import { Component, inject, OnInit } from '@angular/core';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesService } from '../../../services/series.service';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [RouterLink, SafeUrlPipe, CommonModule, FormsModule],
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css',
})
export class SeriesDetailComponent implements OnInit {
  serie: Serie | null = null;
  reviews: any[] = [];
  loading: boolean = true;
  newReview = { rating: 5, comment: '' };
  submittingReview: boolean = false;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  userHasReviewed: boolean = false;

  private seriesService = inject(SeriesService);
  private reviewService = inject(ReviewService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isAdmin: boolean = this.authService.isAdmin();
  isUserAuth: boolean = this.authService.isUser();
  username: string | null = this.authService.getUsername();

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.seriesService.getSerieById(id).subscribe({
        next: (data) => {
          this.serie = data;
          this.loadReviews(id);
        },
        error: () => this.router.navigate(['/']),
      });
    }
  }

  loadReviews(seriesId: number) {
    this.reviewService.getReviewsBySeries(seriesId).subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
        this.userHasReviewed = this.reviews.some(
          (review) => review.username === this.username
        );
      },
      error: () => {
        this.reviews = [];
        this.loading = false;
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitReview() {
    if (!this.serie || !this.username || this.userHasReviewed) return;

    this.submittingReview = true;
    this.errorMessage = '';

    const reviewData = {
      username: this.username,
      seriesTitle: this.serie.title,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
    };

    this.reviewService.createReview(reviewData).subscribe({
      next: (newReview) => {
        this.reviews.unshift(newReview);
        this.newReview = { rating: 5, comment: '' };
        this.submittingReview = false;
        this.userHasReviewed = true;
        this.closeModal();
      },
      error: () => {
        this.errorMessage = 'Error al enviar la reseña';
        this.submittingReview = false;
      },
    });
  }

  getSafeTrailerUrl(): string {
    if (!this.serie?.trailerUrl) return '';

    const videoIdMatch = this.serie.trailerUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
      : '';
  }

  goBack() {
    this.router.navigate(['/series']);
  }
}
