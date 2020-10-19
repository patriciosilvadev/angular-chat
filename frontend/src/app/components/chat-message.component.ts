import { Component, Input } from '@angular/core';
import { Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-chat-message',
  template: `
    <div class="message-container">
      <img src='{{ chatMessage.user.picture }}'>
      <p class="message-body">
        <strong>{{ chatMessage.user.name }}</strong
        >: {{ chatMessage.content }}
      </p>
    </div>
  `,
  styles: [
    `
      .message-container {
        display: flex;
      }
      .message-container img {
        height: 50px;
        border: 2px solid var(--background-color1);
        border-radius: 50%;
      }
      .message-body {
        margin: 0 0 0 20px;
        color: var(--font-color1);
        text-align: left;
        user-select: none;
      }
    `,
  ],
})
export class ChatMessageComponent {
  @Input() chatMessage: Message;
}
