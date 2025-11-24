import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Notification } from 'src/app/services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

ngOnInit() {
  this.subscription = this.notificationService.notifications.subscribe(
    (notifications: Notification[]) => {
      this.notifications = notifications;

      const newest = notifications[notifications.length - 1];
      if (newest) {
        this.playSoundFromService();
      }
    }
  );
}

playSoundFromService() {
  const sound = this.notificationService.getNotificationSound();
  if (sound) {
    const audio = new Audio(sound);
    audio.play();
  }
}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeNotification(id: string) {
    this.notificationService.removeNotification(id);
  }
}
