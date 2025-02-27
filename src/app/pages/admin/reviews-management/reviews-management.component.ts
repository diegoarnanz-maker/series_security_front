import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../../components/admin/admin-navbar/admin-navbar.component";
import { ReviewsListComponent } from '../../../components/reviews/reviews-list/reviews-list.component';

@Component({
  selector: 'app-reviews-management',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    ReviewsListComponent
  ],
  templateUrl: './reviews-management.component.html',
  styleUrl: './reviews-management.component.css'
})
export class ReviewsManagementComponent {

}
