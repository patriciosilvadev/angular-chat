import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/store/models/message.model';
import { Store } from '@ngrx/store';
import { selectMessages, selectIsLoading, selectIsLoaded, selectUserId } from 'src/app/store/states/chat.state';
import { GetMessagesAction } from 'src/app/store/actions/chat.actions';

@Component({
  selector: 'app-chat-timeline',
  template: `<div
    class="chat-timeline"
    #scrollMe
    [scrollTop]="scrollMe.scrollHeight"
    *ngIf="(isLoaded$ | async)"
  >
    <div class='messages-container background-pattern'>
      <div *ngFor="let msg of (messages$ | async)" [className]="isMyMessage(msg.user.id) ? 'msg-right' : 'msg-left'">
        <app-chat-message class="message" [chatMessage]="msg" [myMsg]="isMyMessage(msg.user.id)"></app-chat-message>
      </div>
    </div>
  </div>
  <div *ngIf="(isLoading$ | async)" class='loading-screen chat-timeline'>
    <p>LOADING MESSAGES</p>
  </div>
  `,
  styles: [
    `
      /* TIMELINE */
      .chat-timeline {
        min-height: 100vh;
        overflow-y: scroll;
      }
      .chat-timeline .messages-container {
        padding-bottom: 55px;
        min-height: calc(100vh - 55px);
      }
      /* MESSAGES */
      .chat-timeline .message {
        max-width: 70%;
        display: inline-block;
      }
      /* MY MESSAGES */
      .chat-timeline .msg-right {
        text-align: right;
      }
      /* OTHER MESSAGES */
      .chat-timeline .msg-left {
        text-align: left;
      }
    `,
  ],
})
export class ChatTimelineComponent implements OnInit {
  public messages$: Observable<Message[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  private userId: number;

  constructor(private store: Store) {}

  public isMyMessage(messageUserId: number): boolean {
    return messageUserId === this.userId;
  }

  ngOnInit(): void {
    this.messages$ = this.store.select(selectMessages);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isLoaded$ = this.store.select(selectIsLoaded);

    this.store.select(selectUserId).subscribe(id => this.userId = id);

    this.store.dispatch(GetMessagesAction())
  }
}
