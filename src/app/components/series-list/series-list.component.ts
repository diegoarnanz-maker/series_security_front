import { Component, inject } from '@angular/core';
import { Serie } from '../../models/interfaces/serie';
import { SeriesService } from '../../services/series.service';
import { CommonModule } from '@angular/common';
import { SeriesCardComponent } from '../series-card/series-card.component';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [
    CommonModule,
    SeriesCardComponent,
    ],
  templateUrl: './series-list.component.html',
})
export class SeriesListComponent {
  series: Serie[] = [];
  loading = true;
  errorMessage = '';

  private seriesService = inject(SeriesService);

  constructor() {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries(): void {
    this.seriesService.getAllSeries().subscribe({
      next: (data) => {
        this.series = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las series';
        this.loading = false;
      },
    });
  }

  trackById(index: number, serie: Serie): number {
    return serie.id;
  }
}
