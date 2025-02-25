import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../../services/series.service';
import { Serie } from '../../../models/interfaces/serie';

@Component({
  selector: 'app-series-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './series-form.component.html',
  styleUrl: './series-form.component.css',
})
export class SeriesFormComponent implements OnInit {
  serieForm: FormGroup;
  serieId: number | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';

  private route = inject(ActivatedRoute);
  private seriesService = inject(SeriesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.serieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', Validators.required],
      releaseYear: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}$/)],
      ],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      imageUrl: ['', Validators.required],
      trailerUrl: [''],
    });
  }

  ngOnInit() {
    this.serieId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!isNaN(this.serieId) && this.serieId > 0) {
      this.isEditing = true;
      this.seriesService.getSerieById(this.serieId).subscribe({
        next: (data) => this.serieForm.patchValue(data),
        error: () => this.router.navigate(['/admin/series-management']),
      });
    }
  }

  saveSerie() {
    if (this.serieForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
  
    const serieData: Serie = { ...this.serieForm.value };
  
  
    if (this.isEditing && this.serieId) {
  
      this.seriesService.updateSerie(this.serieId, serieData).subscribe({
        next: () => {
          this.router.navigate(['/admin/series-management']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al actualizar la serie';
        }
      });
    } else {
  
      this.seriesService.addSerie(serieData).subscribe({
        next: () => {
          this.router.navigate(['/admin/series-management']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al crear la serie';
        }
      });
    }
  }
  
  goBack() {
    this.router.navigate(['/admin/series-management']);
  }
}
