import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SendMessageAction } from 'src/app/store/actions/chat.actions';
import { selectUserId } from 'src/app/store/states/chat.state';

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="chat-input">
      <input
        (keyup.enter)="sendMessage()"
        class="message-input"
        type="text"
        [(ngModel)]="messageContent"
      />
      <input
        (click)="sendMessage()"
        class="send-button"
        type="button"
        value="send"
      />
    </div>
  `,
  styles: [
    `
      .chat-input {
        margin: calc(0.5vh - 1px) calc(0.5vw - 1px);
        height: max(6vh, 50px);
        display: flex;
        justify-content: space-between;
      }
      .user-input {
        font-size: var(--font-size2);
        padding: 0px 5px;
        border-radius: var(--radius2);
        border: 2px solid var(--color1);
        min-width: 9vw;
        background-color: var(--background-color2);
        color: var(--font-color2);
      }
      .message-input {
        font-size: var(--font-size2);
        padding: 0px 5px;
        border-radius: var(--radius2);
        border: 2px solid var(--color1);
        margin: 0 0.5vw;
        min-width: 70vw;
        background-color: var(--background-color2);
        color: var(--font-color2);
      }
      .send-button {
        font-size: var(--font-size2);
        border-radius: var(--radius2);
        border: 2px solid var(--color1);
        font-weight: 50;
        min-width: max(10vw, 120px);
        background-color: var(--background-color2);
        color: var(--font-color1);
        background-color: var(--color4);
        letter-spacing: 3px;
        text-transform: uppercase;
      }
    `,
  ],
})
export class ChatInputComponent implements OnInit{
  public userId: number;
  public messageContent: string = '';

  constructor(private store: Store) {}

  public sendMessage = async () => {
    this.store.dispatch(SendMessageAction(this.messageContent, this.userId));
    this.messageContent = '';
  };

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe(id => this.userId = id);
  }
}
