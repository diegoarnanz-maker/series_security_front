import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../../components/user-auth/user-navbar/user-navbar.component";
import { SeriesListComponent } from "../../../components/series/series-list/series-list.component";

@Component({
  selector: 'app-serie-list-user',
  standalone: true,
  imports: [UserNavbarComponent, SeriesListComponent],
  templateUrl: './serie-list-user.component.html',
  styleUrl: './serie-list-user.component.css'
})
export class SerieListUserComponent {

}
