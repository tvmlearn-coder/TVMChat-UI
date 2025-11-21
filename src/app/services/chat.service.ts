import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatUser {
  name: string;
  img: string;
  lastMessage?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private selectedUserSubject = new BehaviorSubject<ChatUser | null>(null);
  selectedUser$: Observable<ChatUser | null> = this.selectedUserSubject.asObservable();

  constructor() { }

  setSelectedUser(user: ChatUser | null) {
    this.selectedUserSubject.next(user);
  }

  getSelectedUser(): ChatUser | null {
    return this.selectedUserSubject.value;
  }
}
