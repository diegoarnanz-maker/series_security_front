import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css',
})
export class AdminNavbarComponent {
  currentSection: string = 'Dashboard';
  private router = inject(Router);

  ngOnInit() {
    this.updateCurrentSection(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentSection(event.url);
      }
    });
  }

  private updateCurrentSection(url: string) {

    if (url.includes('/admin/series-management')) {
      this.currentSection = 'Gestión de Series';
    } else if (url.includes('/admin/user-management')) {
      this.currentSection = 'Gestión de Usuarios';
    } else if (url.includes('/admin/reviews-management')) {
      this.currentSection = 'Gestión de Reviews';
    } else {
      this.currentSection = 'Dashboard';
    }
  }
}
