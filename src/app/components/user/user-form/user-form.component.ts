import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/interfaces/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditing = false;
  errorMessage = '';
  isAdminUser = false;
  
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userId!: number;

  ngOnInit() {
    this.initializeForm();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditing = true;
      this.userId = +userId;
      this.loadUser(this.userId);
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loadUser(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user: User) => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          role: user.roles.length > 0 ? user.roles[0].name : '',
        });
      },
      error: () => (this.errorMessage = 'Error al cargar el usuario'),
    });
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
  
    const selectedRole = this.userForm.value.role;
    const roles = selectedRole
      ? [{ id: selectedRole === 'ROLE_ADMIN' ? 1 : 2, name: selectedRole }]
      : [];
  
    const userData: any = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
  
    if (this.isEditing && this.userId) {
      this.userService.updateUser(this.userId, { ...userData, roles }).subscribe({
        next: () => {
          this.router.navigate(['/admin/user-management']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al actualizar el usuario';
        },
      });
    } else {
      if (this.isAdminUser) {
        userData.roles = roles;
        this.userService.addUser(userData).subscribe({
          next: () => {
            this.router.navigate(['/admin/user-management']);
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error al crear el usuario';
          },
        });
      } else {
        this.authService.register(userData.username, userData.email, userData.password).subscribe({
          next: () => {
            this.router.navigate(['/user/dashboard']);
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error al registrarse';
          },
        });
      }
    }
  }
  

  isAdmin(){
    let isAdmin = false;
    this.userService.getRoles().subscribe((roles: string[]) => {
      isAdmin = roles.includes('ROLE_ADMIN');
    });
    return isAdmin;
  }

  goBack() {
    this.router.navigate(['/admin/user-management']);
  }
}
