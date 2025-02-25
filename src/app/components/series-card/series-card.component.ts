import { Component, inject, Input } from '@angular/core';
import { ActionButtonsComponent } from "../action-buttons/action-buttons.component";
import { Serie } from '../../models/interfaces/serie';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-series-card',
  standalone: true,
  imports: [ActionButtonsComponent],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.css'
})
export class SeriesCardComponent {
  authService = inject(AuthService);

  @Input() serie!: Serie;

  isAdmin = this.authService.getUserRole() === 'ROLE_ADMIN';
  handleAction(event: string) {
    if (event === 'deleted') {
      console.log('Serie eliminada correctamente');
    }
  }
  
}
