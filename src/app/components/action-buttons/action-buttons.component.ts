import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css',
})
export class ActionButtonsComponent {
  @Input() serieId!: number;
  @Output() actionCompleted = new EventEmitter<string>();

  private seriesService = inject(SeriesService);
  private router = inject(Router);

  viewSerie() {
    this.router.navigate(['/series', this.serieId]);
  }

  editSerie() {
    this.router.navigate(['/admin/series-edit', this.serieId]);
  }

  deleteSerie() {
    if (confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
      this.seriesService.deleteSerie(this.serieId).subscribe({
        next: () => {
          this.actionCompleted.emit('deleted');
        },
        error: (err) => {
          console.error('Error al eliminar la serie:', err);
        },
      });
    }
  }
}
