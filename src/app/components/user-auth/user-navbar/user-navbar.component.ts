import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
@Input() currentSection: string = '';
}
