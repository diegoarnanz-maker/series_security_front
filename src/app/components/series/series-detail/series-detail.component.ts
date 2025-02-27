import { Component, inject, OnInit } from '@angular/core';
import { Serie } from '../../../models/interfaces/serie';
import { SeriesService } from '../../../services/series.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [
    RouterLink,
    SafeUrlPipe
  ],
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent implements OnInit {
  serie: Serie | null = null;
  private seriesService = inject(SeriesService);
  private authService = inject(AuthService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isAdmin: boolean = this.authService.isAdmin();
  isUserAuth: boolean = this.authService.isUser();

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.seriesService.getSerieById(id).subscribe({
        next: (data) => (this.serie = data),
        error: () => this.router.navigate(['/']),
      });
    }
  }

  getSafeTrailerUrl(): string {
    if (!this.serie?.trailerUrl) return '';
  
    const videoIdMatch = this.serie.trailerUrl.match(
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
  
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : '';
  }
  
  

  goBack() {
    this.router.navigate(['/series']);
  }
}
