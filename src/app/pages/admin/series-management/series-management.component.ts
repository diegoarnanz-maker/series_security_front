import { Component } from '@angular/core';
import { SeriesListComponent } from "../../../components/series/series-list/series-list.component";
import { SeriesFormComponent } from "../../../components/series/series-form/series-form.component";
import { AdminNavbarComponent } from "../../../components/admin/admin-navbar/admin-navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series-management',
  standalone: true,
  imports: [
    RouterLink,
    SeriesListComponent, 
    AdminNavbarComponent
  ],
  templateUrl: './series-management.component.html',
  styleUrl: './series-management.component.css'
})
export class SeriesManagementComponent {

}
