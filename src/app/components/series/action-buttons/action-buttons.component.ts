import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SeriesService } from '../../../services/series.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.router.navigate([`/admin/series-edit/${this.serieId}`]);
  }  

  deleteSerie() {
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
        this.seriesService.deleteSerie(this.serieId).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La serie ha sido eliminada con éxito.',
              icon: 'success',
              confirmButtonColor: '#FF5252',
              background: '#FBE9E7',
              color: '#3E2723',
            }).then(() => {
              window.location.reload();
            });

            this.actionCompleted.emit('deleted');
          },
          error: (err) => {
            console.error('Error al eliminar la serie:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar la serie.',
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
