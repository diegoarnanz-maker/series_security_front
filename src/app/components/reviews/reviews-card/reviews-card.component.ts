import { Component, Input } from '@angular/core';
import { Review } from '../../../models/interfaces/review';
import { ReviewsActionButtonsComponent } from '../reviews-action-buttons/reviews-action-buttons.component';

@Component({
  selector: 'app-reviews-card',
  standalone: true,
  imports: [
    ReviewsActionButtonsComponent
  ],
  templateUrl: './reviews-card.component.html',
  styleUrl: './reviews-card.component.css',
})
export class ReviewsCardComponent {
  @Input() review!: Review;

  getFormattedDate(): string {
    return new Date(this.review.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
