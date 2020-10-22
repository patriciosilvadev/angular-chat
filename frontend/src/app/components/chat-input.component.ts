import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SendMessageAction } from 'src/app/store/actions/chat.actions';
import { selectUserId } from 'src/app/store/states/chat.state';

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="chat-input">
      <input
        autofocus
        autocomplete='off'
        spellcheck='false'
        (keyup.enter)="sendMessage()"
        class="message-input background-blurred"
        type="text"
        [(ngModel)]="messageContent"
      />
      <input
        (click)="sendMessage()"
        class="send-button"
        type="button"
        value="send"
        [disabled]="messageContent === ''"
      />
    </div>
  `,
  styles: [
    `
      .chat-input {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        display: flex;
        height: 50px;
        margin: 0;
      }
      .chat-input .message-input {
        font-size: var(--input-message-font-size);
        padding: 0px 5px;
        border-radius: var(--input-border-radius);
        border: 0px solid transparent;
        margin: 0;
        min-width: calc(100% - 120px);
        color: var(--input-message-font-color);
      }
      .chat-input .send-button {
        font-size: calc(var(--input-message-font-size) + 4px);
        border-radius: var(--input-border-radius);
        border: 0px solid transparent;
        width: 120px;
        color: var(--input-button-font-color);
        background-color: var(--input-button-color);
        text-transform: uppercase;
      }
      .chat-input .send-button:disabled {
        color: darkgrey;
        background-color: lightgray;
      }
    `,
  ],
})
export class ChatInputComponent implements OnInit{
  public userId: number;
  public messageContent: string = '';

  constructor(private store: Store) {}

  public sendMessage = async () => {
    if (this.messageContent === '') return;
    this.store.dispatch(SendMessageAction(this.messageContent, this.userId));
    this.messageContent = '';
  };

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe(id => this.userId = id);
  }
}
