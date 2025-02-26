import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from '../user-card/user-card.component';
import { User } from '../../../models/interfaces/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../../../models/interfaces/role';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = true;
  errorMessage = '';
  isFiltered = false;

  usernameFilter: string = '';
  roleFilter: string = '';
  roles: Role[] = [
    { id: 1, name: 'ROLE_ADMIN' },
    { id: 2, name: 'ROLE_USER' }
  ];
  
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.map(user => ({
          ...user,
          roles: user.roles.map((role, index) => 
            typeof role === 'string' ? { id: index + 1, name: role } : role
          )
        }));
        
        this.filteredUsers = this.users;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los usuarios';
        this.loading = false;
      },
    });
  }
  
  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      const matchesUsername =
        !this.usernameFilter ||
        user.username.toLowerCase().includes(this.usernameFilter.toLowerCase());
  
      const matchesRole =
        !this.roleFilter || user.roles.some(role => role.name === this.roleFilter);
  
      return matchesUsername && matchesRole;
    });
  
    this.isFiltered = !!(this.usernameFilter || this.roleFilter);
  }
  
  addUser() {
    this.router.navigate(['/admin/user-add']);
  }
}
