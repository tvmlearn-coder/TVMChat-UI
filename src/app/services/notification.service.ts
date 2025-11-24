import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications = this.notifications$.asObservable();

  // Store global notification sound (Base64)
  private _notificationSound?: string;

  constructor() {
    // Load persisted audio from localStorage
    const savedAudio = localStorage.getItem('notificationAudio');
    if (savedAudio) {
      this._notificationSound = savedAudio;
    }
  }

  // Set custom audio globally
  setNotificationSound(base64Audio: string) {
    this._notificationSound = base64Audio;
    localStorage.setItem('notificationAudio', base64Audio);
  }

  // Get current notification sound
  getNotificationSound(): string | undefined {
    return this._notificationSound;
  }

  // Show success notification and play global sound if available
  showSuccess(message: string, duration: number = 2000, sound?: string) {
    this.addNotification('success', message, duration, sound);
  }

  // Show error notification
  showError(message: string, duration: number = 2000, sound?: string) {
    this.addNotification('error', message, duration, sound);
  }

  private addNotification(
    type: 'success' | 'error',
    message: string,
    duration: number,
    sound?: string
  ) {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      duration
    };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, notification]);

    // Play sound: either provided or global sound
    const audioSrc = sound || this._notificationSound;
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play().catch(err => console.warn('Audio play failed:', err));
    }

    // Auto remove after duration
    setTimeout(() => this.removeNotification(notification.id), duration);
  }

  removeNotification(id: string) {
    const currentNotifications = this.notifications$.value;
    this.notifications$.next(currentNotifications.filter(n => n.id !== id));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
