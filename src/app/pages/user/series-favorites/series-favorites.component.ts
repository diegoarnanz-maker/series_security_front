import { Component } from '@angular/core';
import { UserNavbarComponent } from '../../../components/user-auth/user-navbar/user-navbar.component';
import { FavoritesListComponent } from "../../../components/user-auth/favorites-list/favorites-list.component";

@Component({
  selector: 'app-series-favorites',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FavoritesListComponent
],
  templateUrl: './series-favorites.component.html',
  styleUrl: './series-favorites.component.css'
})
export class SeriesFavoritesComponent {

}
