import { Component } from '@angular/core';

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

}
