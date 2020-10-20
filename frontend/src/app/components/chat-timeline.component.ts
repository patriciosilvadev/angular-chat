import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/store/models/message.model';
import { Store } from '@ngrx/store';
import { selectMessages, selectLoading, selectLoaded, selectUserId } from 'src/app/store/states/chat.state';
import { GetMessagesAction } from 'src/app/store/actions/chat.actions';

@Component({
  selector: 'app-chat-timeline',
  template: `<div
    class="chat-timeline"
    #scrollMe
    [scrollTop]="scrollMe.scrollHeight"
    *ngIf="(loaded$ | async) === true"
  >
    <div class='messages-container background-pattern'>
      <div *ngFor="let msg of (messages$ | async)" [className]="isMyMessage(msg.user.id) ? 'msg-right' : 'msg-left'">
        <app-chat-message class="message" [chatMessage]="msg" [myMsg]="isMyMessage(msg.user.id)"></app-chat-message>
      </div>
    </div>
  </div>
  <div *ngIf="(loading$ | async) === true" class='loading-screen chat-timeline'>
    <p>LOADING MESSAGES</p>
  </div>
  `,
  styles: [
    `
      .background-pattern {
        background:
          radial-gradient(#0f0f0f 3px, transparent 4px),
          radial-gradient(#0f0f0f 3px, transparent 4px),
          linear-gradient(#f0f0f0 4px, transparent 0),
          linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px),
          linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px),
          #f0f0f0;
        background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
      }
      /* TIMELINE */
      .chat-timeline {
        height: calc(100vh);
        overflow-y: scroll;
      }
      .chat-timeline .messages-container {
        padding-bottom: 55px;
      }
      /* MESSAGES */
      .chat-timeline .message {
        word-wrap: break-word;
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
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  private userId: number;

  constructor(private store: Store) {}

  public isMyMessage(messageUserId: number): boolean {
    return messageUserId === this.userId;
  }

  ngOnInit(): void {
    this.messages$ = this.store.select(selectMessages);
    this.loading$ = this.store.select(selectLoading);
    this.loaded$ = this.store.select(selectLoaded);

    this.store.select(selectUserId).subscribe(id => this.userId = id);

    this.store.dispatch(GetMessagesAction())
  }
}
