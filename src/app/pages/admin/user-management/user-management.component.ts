import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../../components/admin/admin-navbar/admin-navbar.component";
import { UserListComponent } from "../../../components/user/user-list/user-list.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [AdminNavbarComponent, UserListComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

}
