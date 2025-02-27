import { Component, Input } from '@angular/core';
import { SeriesListComponent } from "../../../components/series/series-list/series-list.component";
import { Serie } from '../../../models/interfaces/serie';
import { UserNavbarComponent } from "../../../components/user-auth/user-navbar/user-navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SeriesListComponent, 
    UserNavbarComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @Input() series!: Serie[];
  @Input() currentSection: string = '';
}
