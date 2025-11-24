import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

interface User {
  id: string;
  email: string;
  username: string;
  about: string;
  dob: string;
  profilePhoto: string;
  notificationSound: string;
  notificationSoundName: string;
  theme: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  editField: string | null = null;
  profileForm: FormGroup;

  loggedInEmail: string = 'admin@123.com';

  showFullImage = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private nav: AuthService,
    private notification: NotificationService   // ✅ Added notification service
  ) {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      about: [''],
      dob: ['']
    });
  }

ngOnInit(): void {
  this.loadUserProfile();

  // Apply dark theme if saved
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}


loadUserProfile() {
  this.profileService.getUserByEmail(this.loggedInEmail).subscribe({
    next: (data) => {
      this.user = data;

      if (this.user) {
        // Patch form
        this.profileForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          about: this.user.about,
          dob: this.user.dob
        });

        // Apply theme from user profile
        if (this.user.theme === 'dark') {
          document.body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
        }
      }
    },

    error: (err) => {
      console.error('Error fetching user:', err);
      this.notification.showError('Failed to load your profile.');
    }
  });
}


edit(field: string) {
  if (field === 'email') return; // ❌ email cannot be edited
  this.editField = field;
}

  save(field: string) {
     if (field === 'email') return;

    if (!this.user) return;

    const updatedValue = this.profileForm.get(field)?.value;
    const updatedData = { ...this.user, [field]: updatedValue };

    this.profileService.updateProfile(updatedData).subscribe({
      next: (res) => {
        this.user = res;
        this.editField = null;

        // ✅ Show success toast
        this.notification.showSuccess(`${field} updated successfully!`);
      },

      error: (err) => {
        console.error('Error updating user:', err);

        // ❌ Show error toast
        this.notification.showError(`Failed to update ${field}.`);
      }
    });
  }

  changePhoto(event: any) {
    if (!this.user) return;
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedData = { ...this.user, profilePhoto: reader.result as string };

      this.profileService.updateProfile(updatedData).subscribe({
        next: (res) => {
          this.user = res;

          // ✅ Success toast
          this.notification.showSuccess('Profile photo updated!');
        },

        error: (err) => {
          console.error(err);

          // ❌ Error toast
          this.notification.showError('Failed to update photo.');
        }
      });
    };

    reader.readAsDataURL(file);
  }

  openFullPhoto() {
    this.showFullImage = true;
  }

  closeFullPhoto() {
    this.showFullImage = false;
  }

  back() {
    this.nav.goBack();
  }
}
