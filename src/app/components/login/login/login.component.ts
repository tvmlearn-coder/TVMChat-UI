

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isRegister = false;

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {
    // INIT FORMS INSIDE CONSTRUCTOR (correct)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


  // TOGGLE MODE LOGIN / REGISTER

  toggleMode() {
    this.isRegister = !this.isRegister;
  }


  // PASSWORD VISIBILITY TOGGLES

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPassword() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
  // SUBMIT HANDLER (LOGIN + REGISTER)

  submit() {
    // REGISTER

    if (this.isRegister) {
      if (this.registerForm.invalid) {
        this.notification.showError('Please fill all fields correctly');
        return;
      }

      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.notification.showError('Passwords do not match');
        return;
      }

      this.authService.register(email, password).subscribe({
          next: () => {
            this.notification.showSuccess('Registration Successful!');
            
            // store the registered email since 'user' is not available here
            localStorage.setItem('loggedInUserEmail', email);
            this.registerForm.reset();
            
            this.isRegister = false;
          },
          error: () => {
            this.notification.showError('Registration failed. Try again!');
          }
        });

      return;
    }

    // LOGIN
// LOGIN
if (this.loginForm.invalid) {
  this.notification.showError('Please fill all fields correctly', );
  return;
}

const { email, password } = this.loginForm.value;

this.authService.login(email, password).subscribe((user) => {
  if (user) {
    // Store user ID or token
    localStorage.setItem('token', user.id);

    // Store logged-in email for profile setup
    localStorage.setItem('userEmail', email);

    this.notification.showSuccess('Login Successful!');
    localStorage.setItem('loggedInUserEmail', email);
    
    setTimeout(() => {
      // Redirect to profile setup page instead of dashboard
      this.router.navigate(['/profilesetup']);
    }, 800);
  } else {
    this.notification.showError('Invalid Email or Password!');
  }
});
  }
}
