import { Component, Input } from '@angular/core';
import { Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-chat-message',
  template: `
    <div class="message-container" [class.message-from-me]="myMsg" [class.message-from-others]="!myMsg" [class.first]="first" [class.notFirst]="!first">
      <img class="background-blurred" [class.notFirst]="!first" src='{{ chatMessage.user.picture }}'>
      <div class="message-body">
        <div class='header' [class.notFirst]="!first">{{ chatMessage.user.name }}</div>
        <p>{{ chatMessage.content }}</p>
        <div class='footer'>{{ (chatMessage.createdAt | date:'HH:mm') }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ALL MESSAGES */
      .message-container {
        font-size: var(--any-msg-font-size);
        display: flex;
        user-select: none;
      }
      .message-container.message-from-me.notFirst {
        margin: 0px 105px 0px 0px;
      }
      .message-container.message-from-others.notFirst {
        margin: 0px 0px 0px 105px;
      }
      /* .message-container.first {
        margin-top: 10px;
      } */
      .message-container img {
        padding: 5px;
        height: 65px;
        border-radius: var(--any-msg-border-radius);
      }
      .message-container img.notFirst {
        display: none;
      }
      .message-body {
        min-width: 50px;
        color: var(--any-msg-font-color);
        text-align: left;
        border-radius: var(--any-msg-border-radius);
        padding: 10px;
        vertical-align: middle;
      }
      .message-body p {
        margin: 0;
        word-break: break-word;
      }
      /* HEADER */
      .message-body .header {
        margin: 0;
        font-weight: 700;
        font-size: var(--any-msg-header-size);
        color: var(--any-msg-header-color);
      }
      .message-body .header.notFirst {
        display: none;
      }
      /* FOOTER */
      .message-body .footer{
        text-align: right;
        margin: 0 -5px -5px 0;
        font-size: var(--any-msg-footer-size);
        color: var(--any-msg-footer-color);
      }
      /* MESSAGES FROM ME */
      .message-from-me {
        flex-direction: row-reverse;
      }
      .message-from-me .message-body {
        background-color: var(--my-msg-background-color);
      }
      .message-from-me img {
        margin: 0 15px;
      }
      /* MESSAGES FROM OTHERS */
      .message-from-others .message-body {
        background-color: var(--others-msg-background-color);
      }
      .message-from-others img {
        margin: 0 15px;
      }
    `,
  ],
})
export class ChatMessageComponent {
  @Input() chatMessage: Message;
  @Input() myMsg: boolean;
  @Input() first: boolean;
}
