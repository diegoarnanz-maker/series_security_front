import { Component } from '@angular/core';
import { SeriesListComponent } from "../../../components/series-list/series-list.component";
import { SeriesFormComponent } from "../../../components/series-form/series-form.component";

@Component({
  selector: 'app-series-management',
  standalone: true,
  imports: [SeriesListComponent],
  templateUrl: './series-management.component.html',
  styleUrl: './series-management.component.css'
})
export class SeriesManagementComponent {

}
