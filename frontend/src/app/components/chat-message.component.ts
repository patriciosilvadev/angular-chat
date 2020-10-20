import { Component, Input } from '@angular/core';
import { Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-chat-message',
  template: `
    <div [className]="myMsg ? 'message-container message-from-me' : 'message-container message-from-others'">
      <img src='{{ chatMessage.user.picture }}'>
      <div class="message-body">
        <div class='header'><p>{{ chatMessage.user.name }}</p></div>
        <p>{{ chatMessage.content }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      /* ALL MESSAGES */
      .message-container {
        font-size: var(--any-msg-font-size);
        display: flex;
        margin: 5px;
        user-select: none;
      }
      .message-container img {
        background-color: var(--any-msg-img-border-color);
        height: 52px;
        border: 3px solid var(--any-msg-img-border-color);
        border-radius: 5px;
      }
      .message-body {
        color: var(--any-msg-font-color);
        text-align: left;
        border-radius: 5px;
        padding: 5px;
        vertical-align: middle;
      }
      .message-body .header p{
        margin: 0;
        font-weight: 700;
      }
      .message-body p{
        margin: 0;
        word-break: break-word;
      }
      /* MESSAGES FROM ME */
      .message-from-me {
        flex-direction: row-reverse;
      }
      .message-from-me .message-body {
        background-color: var(--my-msg-background-color);
      }
      .message-from-me img {
        margin-left: 10px;
        margin-right: 5px;
      }
      /* MESSAGES FROM OTHERS */
      .message-from-others .message-body {
        background-color: var(--others-msg-background-color);
      }
      .message-from-others img {
        margin-right: 10px;
        margin-left: 5px;
      }
    `,
  ],
})
export class ChatMessageComponent {
  @Input() chatMessage: Message;
  @Input() myMsg: boolean;
}
