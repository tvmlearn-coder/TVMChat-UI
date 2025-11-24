import { Component } from '@angular/core';

interface Message {
  from: 'you' | 'ai';
  text: string;
}

@Component({
  selector: 'app-dummy-ai',
  templateUrl: './dummy-ai.component.html',
  styleUrls: ['./dummy-ai.component.scss']
})
export class DummyAiComponent {
  prompt = '';
  messages: Message[] = [];


  getAIResponse(input: string): string {
    const text = input.toLowerCase();

    if (text.includes('hi') || text.includes('hello')) {
      return 'Hello! How can I help you today?';
    }

    if (text.includes('name')) {
      return 'My name is Simple AI ';
    }

    if (text.includes('how are you')) {
      return 'I am fine! Thanks for asking.';
    }

    if (text.includes('angular')) {
      return 'Angular is a powerful front-end framework!';
    }

    if (text.includes('bye')) {
      return 'Goodbye! Have a great day!';
    }

    // default AI response
    const randomReplies = [
      "Interesting... tell me more.",
      "I understand.",
      "Can you explain that better?",
      "Okay, got it.",
      "That sounds good!",
      "Hmm… Let me think."
    ];

    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
  }

  send() {
    const text = this.prompt.trim();
    if (!text) return;

    this.messages.push({ from: 'you', text });

    // AI reply
    const aiReply = this.getAIResponse(text);
    setTimeout(() => {
      this.messages.push({ from: 'ai', text: aiReply });
    }, 300);

    this.prompt = '';
  }
}
