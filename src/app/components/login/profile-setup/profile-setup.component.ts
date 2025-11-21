import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {

  profile!: FormGroup;
  userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.profile = this.fb.group({
      profilePhoto: [''],
      username: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      about: [''],
      dob: ['']
    });
  }

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.userEmail = email;
      this.profileService.getUserByEmail(email).subscribe(user => {
        if (user) {
          this.profile.patchValue({
            profilePhoto: user.profilePhoto || '',
            username: user.username || '',
            email: user.email || '',
            about: user.about || '',
            dob: user.dob || ''
          });
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profile.patchValue({ profilePhoto: reader.result });
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (!this.profile.valid) {
      this.notification.showError('Please enter a username to continue');
      return;
    }

    const profileData = this.profile.getRawValue();
    profileData.email = this.userEmail; // Ensure email is included
    this.profileService.updateProfile(profileData).subscribe({
      next: () => {
        this.notification.showSuccess('Profile saved successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.notification.showError('Failed to save profile');
      }
    });
  }

  skip() {
    this.router.navigate(['/dashboard']);
  }
}


