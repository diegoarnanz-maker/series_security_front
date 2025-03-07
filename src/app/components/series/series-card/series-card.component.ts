import { Component, inject, Input } from '@angular/core';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { Serie } from '../../../models/interfaces/serie';
import { AuthService } from '../../../services/auth.service';
import { FavoritesService } from '../../../services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-series-card',
  standalone: true,
  imports: [ActionButtonsComponent],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.css',
})
export class SeriesCardComponent {
  authService = inject(AuthService);
  favoritesService = inject(FavoritesService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  @Input() serie!: Serie;

  isAdmin = this.authService.getUserRole() === 'ROLE_ADMIN';
  isUserAuth = this.authService.getUserRole() === 'ROLE_USER';

  isFavoritesPage = this.router.url.includes('/favorites');

  handleAction(event: string) {
    if (event === 'deleted') {
      console.log('Serie eliminada correctamente');
    }
  }

  addToFavorites() {
    if (!this.serie) return;

    const favoriteData = {
      seriesTitle: this.serie.title,
    };

    this.favoritesService.addFavorite(favoriteData).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Añadida a Favoritos! ⭐',
          text: `${this.serie.title} ha sido agregada a tu lista de favoritos.`,
          icon: 'success',
          confirmButtonColor: '#FF5252',
          background: '#FBE9E7',
          color: '#3E2723',
        });
      },
      error: (err) => {
        console.error('❌ Error al añadir a favoritos:', err);

        if (err.status === 500) {
          Swal.fire({
            title: '⚠️ Ya está en Favoritos',
            text: `${this.serie.title} ya está en tu lista.`,
            icon: 'warning',
            confirmButtonColor: '#D32F2F',
            background: '#FBE9E7',
            color: '#3E2723',
          });
        } else {
          Swal.fire({
            title: '❌ Error',
            text: 'No se pudo añadir a favoritos. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonColor: '#B71C1C',
            background: '#FBE9E7',
            color: '#3E2723',
          });
        }
      },
    });
  }

  removeFromFavorites() {
    if (!this.serie) return;

    this.favoritesService.removeFavorite(this.serie.id).subscribe({
      next: () => {
        Swal.fire({
          title: '❌ Eliminada de Favoritos',
          text: `${this.serie.title} ha sido removida de tus favoritos.`,
          icon: 'success',
          confirmButtonColor: '#FF5252',
          background: '#FBE9E7',
          color: '#3E2723',
        }).then(() => {
          window.location.reload(); // Si no se quiere recargar todo la pagina se podria mandar un output al padre para que recargue solo la lista de favoritos
        });
      },
      error: (err) => {
        console.error('❌ Error al eliminar de favoritos:', err);
        Swal.fire({
          title: '❌ Error',
          text: 'No se pudo eliminar de favoritos. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonColor: '#B71C1C',
          background: '#FBE9E7',
          color: '#3E2723',
        });
      },
    });
  }

  goSerieDetails() {
    this.router.navigate(['/series', this.serie.id]);
  }
}
