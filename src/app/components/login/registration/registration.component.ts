import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm!: FormGroup;
  errorMsg = '';
  successMsg = '';
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

togglePassword() {
  this.passwordVisible = !this.passwordVisible;
}

toggleConfirmPassword() {
  this.confirmPasswordVisible = !this.confirmPasswordVisible;
}

  /** Initialize Registration Form */
  private initForm(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  /** Password Match Validator */
  private passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  /** Submit Registration */
  register(): void {
    if (this.registerForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly';
      this.successMsg = '';
      return;
    }

    const { email, password } = this.registerForm.value;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.successMsg = 'Registration Successful!';
        this.errorMsg = '';
        this.registerForm.reset();
      },
      error: () => {
        this.errorMsg = 'Registration failed. Try again!';
        this.successMsg = '';
      }
    });
  }
}
