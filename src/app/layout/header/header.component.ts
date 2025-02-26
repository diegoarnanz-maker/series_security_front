import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.getUserRole() === 'ROLE_USER';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsername(): string | null {
    const username = this.authService.getUsername();
    return username ? username.toUpperCase() : null;
  }
}
