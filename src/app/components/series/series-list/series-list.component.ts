import { Component, inject, Input, OnInit } from '@angular/core';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesService } from '../../../services/series.service';
import { CommonModule } from '@angular/common';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, SeriesCardComponent, FormsModule],
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent implements OnInit {
  @Input() serieId!: number;

  series: Serie[] = [];
  filteredSeries: Serie[] = [];
  loading = true;
  errorMessage = '';
  isFiltered = false;

  nameFilter: string = '';
  genreFilter: string = '';
  ratingFilter: number | null = null;
  genres: string[] = [];

  private seriesService = inject(SeriesService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.loadSeries();
    this.loadGenres();
  }

  loadSeries(): void {
    this.seriesService.getAllSeries().subscribe({
      next: (data) => {
        this.series = data;
        this.filteredSeries = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las series';
        this.loading = false;
      },
    });
  }

  loadGenres(): void {
    this.seriesService.getGenres().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: () => {
        console.error('Error al cargar los géneros');
      },
    });
  }

  filterSeries(): void {
    this.filteredSeries = this.series.filter((serie) => {
      return (
        (!this.nameFilter ||
          serie.title.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
        (!this.genreFilter || serie.genre === this.genreFilter) &&
        (!this.ratingFilter || serie.rating >= this.ratingFilter)
      );
    });

    this.isFiltered = !!(
      this.nameFilter ||
      this.genreFilter ||
      this.ratingFilter
    );
  }

  trackById(index: number, serie: Serie): number {
    return serie.id;
  }

  addSerie(): void {
    this.router.navigate([`/admin/series-add/${this.serieId}`]);
  }
}
