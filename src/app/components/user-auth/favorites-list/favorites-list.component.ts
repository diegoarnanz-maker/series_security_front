import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { AuthService } from '../../../services/auth.service';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesCardComponent } from '../../series/series-card/series-card.component';

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
    const username = this.authService.getUsername();
    console.log('🔍 Username obtenido:', username);
  
    if (!username) {
      this.errorMessage = 'No se ha encontrado un usuario autenticado.';
      this.loading = false;
      return;
    }
  
    this.favoritesService.getFavoritesByUsername(username).subscribe({
      next: (data) => {
        this.favorites = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar favoritos:', err);
        this.errorMessage = 'Error al cargar favoritos.';
        this.loading = false;
      },
    });
  }
  
  
}
