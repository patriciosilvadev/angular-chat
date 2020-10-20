import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SendMessageAction } from 'src/app/store/actions/chat.actions';
import { selectUserId } from 'src/app/store/states/chat.state';

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="chat-input">
      <input
        autocomplete='off'
        spellcheck='false'
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
        font-size: var(--font-size2);
        padding: 0px 5px;
        border-radius: var(--radius2);
        border: 2px solid var(--color1);
        margin: 0;
        min-width: calc(100% - 120px);
        background-color: var(--background-color2);
        color: var(--font-color1);
        backdrop-filter: blur(5px);
      }
      .chat-input .send-button {
        font-size: var(--font-size2);
        border-radius: var(--radius2);
        border: 2px solid var(--color1);
        width: 120px;
        color: var(--font-color1);
        background-color: var(--color4);
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
