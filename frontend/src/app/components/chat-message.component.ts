import { Component, Input } from '@angular/core';
import { Message } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-chat-message',
  template: `
    <div class="message-container" [class.message-from-me]="myMsg" [class.message-from-others]="!myMsg" [class.first]="first" [class.notFirst]="!first">
      <img class="background-blurred" [class.notFirst]="!first" src='{{ chatMessage.user.picture }}'>
      <div class="message-body">
        <div class='header' [class.notFirst]="!first"><p>{{ chatMessage.user.name }}</p></div>
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
        user-select: none;
      }
      .message-container.message-from-me.notFirst {
        margin: 0px 85px 0px 0px;
      }
      .message-container.message-from-others.notFirst {
        margin: 0px 0px 0px 85px;
      }
      .message-container.first {
        margin-top: 10px;
      }
      .message-container img {
        padding: 4px;
        height: 62px;
        border-radius: var(--any-msg-border-radius);
      }
      .message-container img.notFirst {
        display: none;
      }
      .message-body {
        color: var(--any-msg-font-color);
        text-align: left;
        border-radius: var(--any-msg-border-radius);
        padding: 10px;
        vertical-align: middle;
      }
      .message-body .header p{
        margin: 0;
        font-weight: 700;
      }
      .message-body .header.notFirst p{
        display: none;
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
  @Input() first: boolean;
}
