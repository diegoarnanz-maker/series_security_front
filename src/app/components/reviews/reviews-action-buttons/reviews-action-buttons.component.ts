import { Component, inject, Input } from '@angular/core';
import { Review } from '../../../models/interfaces/review';
import { ReviewService } from '../../../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews-action-buttons',
  standalone: true,
  imports: [],
  templateUrl: './reviews-action-buttons.component.html',
  styleUrl: './reviews-action-buttons.component.css',
})
export class ReviewsActionButtonsComponent {
  @Input() review!: Review;
  private reviewService = inject(ReviewService);

  deleteReview() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B71C1C',
      cancelButtonColor: '#D32F2F',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#FBE9E7',
      color: '#3E2723',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.deleteReview(this.review.id!).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La reseña ha sido eliminada con éxito.',
              icon: 'success',
              confirmButtonColor: '#FF5252',
              background: '#FBE9E7',
              color: '#3E2723',
            }).then(() => {
              window.location.reload(); // Recargar la página para actualizar la lista
            });
          },
          error: (err) => {
            console.error('Error al eliminar la reseña:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la reseña.',
              icon: 'error',
              confirmButtonColor: '#B71C1C',
              background: '#FBE9E7',
              color: '#3E2723',
            });
          },
        });
      }
    });
  }
}
