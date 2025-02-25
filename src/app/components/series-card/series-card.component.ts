import { Component, Input } from '@angular/core';
import { ActionButtonsComponent } from "../action-buttons/action-buttons.component";
import { Serie } from '../../models/interfaces/serie';

@Component({
  selector: 'app-series-card',
  standalone: true,
  imports: [ActionButtonsComponent],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.css'
})
export class SeriesCardComponent {

  @Input() serie!: Serie;
}
