import { Component } from '@angular/core';
import { ChatService, ChatUser } from '../../../../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
users = [
  { name: "Joshva", img: "assets/profile2.jpg", lastMessage: "tvm-chat.zip", time: "16:33" },
  { name: "Priyatharshan", img: "assets/profile3.jpg", lastMessage: "Okk daa", time: "10:07" },
  { name: "VTM Group", img: "assets/group.png", lastMessage: "Ok sir", time: "09:54" },
  
];
  constructor(private chatService: ChatService) {}

  selectUser(user: ChatUser) {
    this.chatService.setSelectedUser(user);
  }

}
