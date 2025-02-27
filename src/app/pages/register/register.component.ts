import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user/user-form/user-form.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
