import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { AuthService } from '../../../services/auth.service';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesCardComponent } from '../../series/series-card/series-card.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, SeriesCardComponent],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.css',
})
export class FavoritesListComponent implements OnInit {
  favorites: Serie[] = [];
  loading = true;
  errorMessage = '';

  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const userId = this.authService.getUserId();
  
    if (!userId) {
      this.errorMessage = 'No se ha encontrado un usuario autenticado.';
      this.loading = false;
      return;
    }

    this.favoritesService.getFavoritesByUserId(userId).subscribe({
      next: (favoritesData) => {
        if (favoritesData.length === 0) {
          this.favorites = [];
          this.loading = false;
          return;
        }

        // Mapeamos los IDs de las series y hacemos una petición por cada una
        const seriesRequests = favoritesData.map(favorite =>
          this.favoritesService.getSerieById(favorite.seriesId)
        );

        // Ejecutamos todas las peticiones en paralelo
        forkJoin(seriesRequests).subscribe({
          next: (seriesDetails) => {
            this.favorites = seriesDetails;
            this.loading = false;
          },
          error: (err) => {
            console.error('❌ Error al cargar detalles de series:', err);
            this.errorMessage = 'Error al cargar detalles de las series.';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar favoritos:', err);
        this.errorMessage = 'Error al cargar favoritos.';
        this.loading = false;
      },
    });
  }
}
