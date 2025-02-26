import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { User } from '../../../models/interfaces/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-action-buttons.component.html',
  styleUrl: './user-action-buttons.component.css',
})
export class UserActionButtonsComponent {
  @Input() user!: User;
  @Input() isInSeriesList: boolean = false;

  private router = inject(Router);

  constructor() {}

  private userService = inject(UserService);

  editUser() {
    this.router.navigate([`/admin/user-edit/${this.user.id}`]);
  }

  viewUser() {
    this.router.navigate([`/users/${this.user.id}`]);
  }

  deleteUser() {
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
        this.userService.deleteUser(this.user.id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado con éxito.',
              icon: 'success',
              confirmButtonColor: '#FF5252',
              background: '#FBE9E7',
              color: '#3E2723',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (err) => {
            console.error('Error al eliminar el usuario:', err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el usuario.',
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
