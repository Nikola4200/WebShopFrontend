import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password != this.confirmPassword) {
      alert("Passwords does not match");
    }
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        alert("You have benn successfully registered to our sistem!");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert("System can't register user based on data you provided!");
        console.error(error);
      }
    });
  }
}


