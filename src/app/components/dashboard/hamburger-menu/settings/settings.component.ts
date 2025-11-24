import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: any = null;
  selectedFileName: string = '';
  selectedAudioBase64?: string;
  themeChecked: boolean = false;

  constructor(
    private nav:AuthService,
    private profileService: ProfileService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadLoggedUser();
  }

  loadLoggedUser() {
    const email = localStorage.getItem('loggedInUserEmail');
    if (!email) return;

    this.profileService.getUserByEmail(email).subscribe(res => {
      this.user = res;

      // Apply theme from user profile
      if (this.user.theme === 'dark') {
        document.body.classList.add('dark-theme');
        this.themeChecked = true;
      } else {
        document.body.classList.remove('dark-theme');
        this.themeChecked = false;
      }

      // Load notification sound if set
if (this.user.notificationSound) {
  this.selectedAudioBase64 = this.user.notificationSound;
  this.selectedFileName = this.user.notificationSoundName || '';

if (this.selectedAudioBase64) {
  this.notification.setNotificationSound(this.selectedAudioBase64);
}
}

  });
  }

toggleTheme(event: any) {
  this.themeChecked = event.target.checked;
  const theme = this.themeChecked ? 'dark' : 'light';

  if (this.themeChecked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  // Save theme
  if (this.user) {
    this.profileService.updateProfile({ email: this.user.email, theme }).subscribe({
      next: () => this.notification.showSuccess(`Theme changed to ${theme}`),
      error: () => this.notification.showError('Failed to save theme')
    });
  }
}



  onFileSelected(event: any) {
    if (!this.user) return;

    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();

reader.onload = () => {
  this.selectedAudioBase64 = reader.result as string;

  // ⭐ Immediately register this user’s audio globally
 if (this.selectedAudioBase64) {
  this.notification.setNotificationSound(this.selectedAudioBase64);
}


  this.profileService.updateProfile({
    email: this.user.email,
    notificationSound: this.selectedAudioBase64,
    notificationSoundName: this.selectedFileName
  }).subscribe({
    next: () => this.notification.showSuccess('Notification sound saved!'),
    error: () => this.notification.showError('Failed to save sound')
  });
};


      reader.readAsDataURL(file);
    }
  }

  playTestSound() {
    if (this.selectedAudioBase64) {
      const audio = new Audio(this.selectedAudioBase64);
      audio.play();
    }
  }

logout() {
  this.notification.showSuccess('Successfully Logged Out');
  localStorage.removeItem('loggedInUserEmail');
  document.body.classList.remove('dark-theme');
  this.router.navigate(['/']);
}


  back(){
   this.nav.goBack()
  }
}
