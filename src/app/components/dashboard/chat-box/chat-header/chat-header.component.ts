import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, ChatUser } from '../../../../services/chat.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit, OnDestroy {
  selectedUser: ChatUser | null = null;
  private sub: Subscription | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sub = this.chatService.selectedUser$.subscribe(u => this.selectedUser = u);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get initials(): string {
    const name = this.selectedUser?.name;
    if (!name) return 'CM';
    const parts = name.split(' ');
    return (parts[0]?.charAt(0) || 'C') + (parts[1]?.charAt(0) || 'M');
  }
}
