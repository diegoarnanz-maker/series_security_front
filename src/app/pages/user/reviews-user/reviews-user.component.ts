import { Component } from '@angular/core';
import { UserNavbarComponent } from '../../../components/user-auth/user-navbar/user-navbar.component';
import { ReviewsListComponent } from '../../../components/reviews/reviews-list/reviews-list.component';


@Component({
  selector: 'app-reviews-user',
  standalone: true,
  imports: [
    UserNavbarComponent,
    ReviewsListComponent
],
  templateUrl: './reviews-user.component.html',
  styleUrl: './reviews-user.component.css'
})
export class ReviewsUserComponent {

}
