import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../models/interfaces/user';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserActionButtonsComponent } from '../user-action-buttons/user-action-buttons.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    UserActionButtonsComponent],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent {
  user!: User;
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.loadUser();
  }

  loadUser() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(userId)) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: () => console.error('Error al cargar el usuario'),
      });
    }
  }
}
