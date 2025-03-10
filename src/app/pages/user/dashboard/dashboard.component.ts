import { Component, inject, Input, OnInit } from '@angular/core';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesService } from '../../../services/series.service';
import { UserNavbarComponent } from '../../../components/user-auth/user-navbar/user-navbar.component';
import { SeriesCardComponent } from '../../../components/series/series-card/series-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    UserNavbarComponent,
    SeriesCardComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @Input() series!: Serie[];
  @Input() currentSection: string = '';

  latestSeries: Serie[] = [];
  highRatedSeries: Serie[] = [];

  private seriesService = inject(SeriesService);

  ngOnInit() {
    this.seriesService.getLatestSeries().subscribe({
      next: (data) => {
        console.log("Últimas series recibidas:", data); // 🛠 DEBUG
        this.latestSeries = data;
      },
      error: (err) => {
        console.error("Error cargando últimas series", err);
        this.latestSeries = [];
      }
    });
    this.seriesService.getSeriesByRating(8).subscribe({
      next: (data) => (this.highRatedSeries = data),
      error: () => (this.highRatedSeries = []),
    });
  }
}
