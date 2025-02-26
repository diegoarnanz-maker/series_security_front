import { Component, Input } from '@angular/core';
import { User } from '../../../models/interfaces/user';
import { UserActionButtonsComponent } from "../user-action-buttons/user-action-buttons.component";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UserActionButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user!: User;

  getRoleNames(): string {
    return this.user.roles.map(role => role.name).join(", ");
  }
}
