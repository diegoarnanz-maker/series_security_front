import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Serie } from '../../models/interfaces/serie';
import { SeriesService } from '../../services/series.service';
import { SeriesCardComponent } from '../../components/series/series-card/series-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [
    RouterLink,
    SeriesCardComponent,
    CommonModule
  ],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.css',
})
export class PublicHomeComponent implements OnInit {
  latestSeries: Serie[] = [];
  highRatedSeries: Serie[] = [];
  genres: string[] = [];
  filteredSeries: Serie[] = [];
  allSeries: Serie[] = [];
  selectedGenre: string | null = null;
  showAll: boolean = false;

  private seriesService = inject(SeriesService);

  ngOnInit() {
    this.loadInitialData();
    this.loadAllSeries();
  }

  loadInitialData(): void {
    this.seriesService.getLatestSeries().subscribe({
      next: (data) => (this.latestSeries = data.slice(0, 4)),
      error: () => (this.latestSeries = []),
    });

    this.seriesService.getSeriesByRating(8.5).subscribe({
      next: (data) => (this.highRatedSeries = data.slice(0, 3)),
      error: () => (this.highRatedSeries = []),
    });

    this.seriesService.getGenres().subscribe({
      next: (data) => (this.genres = data),
      error: () => (this.genres = []),
    });
  }

  loadAllSeries(): void {
    this.seriesService.getAllSeries().subscribe({
      next: (data) => (this.allSeries = data),
      error: () => (this.allSeries = []),
    });
  }

  // Filtro por género
  filterByGenre(genre: string): void {
    this.showAll = false;
    if (genre === 'all') {
      this.selectedGenre = null;
      this.filteredSeries = [];
    } else {
      this.selectedGenre = genre;
      this.seriesService.getSeriesByGenre(genre).subscribe({
        next: (data) => (this.filteredSeries = data),
        error: () => (this.filteredSeries = []),
      });
    }
  }

  showAllSeries(): void {
    this.selectedGenre = null;
    this.showAll = true;
  }
}
