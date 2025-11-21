import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent {
  
  showEmoji = false;

  emojis = [
    "😀","😁","😂","🤣","😃","😄","😅","😉","😊","😍",
    "😘","😜","🤩","😎","😢","😭","😡","😱","👍","👌",
    "🙏","🔥","❤️","✨","🎉"
  ];

  toggleEmoji() {
    this.showEmoji = !this.showEmoji;
  }

  pickEmoji(e: string) {
    console.log("Emoji clicked:", e);
    
    this.showEmoji = false;
  
  }

}
