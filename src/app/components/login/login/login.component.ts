import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isRegister = false;

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  errorMsg = '';
  successMsg = '';

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.errorMsg = '';
    this.successMsg = '';
  }


  // PASSWORD VISIBILITY TOGGLES

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPassword() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }


  // AUTO-HIDE MESSAGES AFTER 1s

  private autoHide() {
    setTimeout(() => {
      this.errorMsg = '';
      this.successMsg = '';
    }, 1000);
  }


  // SUBMIT HANDLER (LOGIN + REGISTER)

  submit() {
    this.errorMsg = '';
    this.successMsg = '';


    // REGISTER

    if (this.isRegister) {
      if (this.registerForm.invalid) {
        this.errorMsg = 'Please fill all fields correctly';
        this.autoHide();
        return;
      }

      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMsg = 'Passwords do not match';
        this.autoHide();
        return;
      }

      this.authService.register(email, password).subscribe({
        next: () => {
          this.successMsg = 'Registration Successful!';
          this.registerForm.reset();
          this.isRegister = false;
          this.autoHide();
        },
        error: () => {
          this.errorMsg = 'Registration failed. Try again!';
          this.autoHide();
        }
      });

      return;
    }

    // LOGIN

    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly';
      this.autoHide();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((user) => {
      if (user) {
        localStorage.setItem('token', user.id);
        this.successMsg = 'Login Successful!';
        this.autoHide();
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      } else {
        this.errorMsg = 'Invalid Email or Password!';
        this.autoHide();
      }
    });
  }
}
