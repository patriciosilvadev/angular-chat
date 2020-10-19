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
    <div *ngFor="let msg of (messages$ | async)" [class.my-msg]="msg.user.id === userId">
      <app-chat-message class="message" [chatMessage]="msg"></app-chat-message>
    </div>
  </div>
  <div *ngIf="(loading$ | async) === true" class='loading-screen chat-timeline'>
    <p>LOADING MESSAGES</p>
  </div>
  `,
  styles: [
    `
      .loading-screen {
        color: white; font-size: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .loading-screen p {
          color: var(--font-color2);
          font-size: 60px;
      }
      .chat-timeline {
        /* background-color: var(--background-color2); */
        border-radius: var(--radius2);
        margin: calc(0.5vh - 1px) calc(0.5vw - 1px);
        height: calc(92vh - 20px);
        border: 2px solid var(--color1);
        padding: 0 100px 20px;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: var(--font-size1);
      }
      .chat-timeline .my-msg {
        text-align: right;
      }
      .chat-timeline .message {
        word-wrap: break-word;
        max-width: 50%;
        margin: 6px 0;
        display: inline-block;
        border: 1px solid transparent;
        border-radius: var(--radius1);
        padding: 10px;
        background-color: var(--color2);
        box-shadow: 0px 0px 2px 2px var(--color2);
        backdrop-filter: blur(2px);
      }
      .chat-timeline .my-msg .message {
        background-color: var(--color3);
        box-shadow: 0px 0px 2px 2px var(--color3);
      }
    `,
  ],
})
export class ChatTimelineComponent implements OnInit {
  public messages$: Observable<Message[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public userId: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.messages$ = this.store.select(selectMessages);
    this.loading$ = this.store.select(selectLoading);
    this.loaded$ = this.store.select(selectLoaded);

    this.store.select(selectUserId).subscribe(id => this.userId = id);

    this.store.dispatch(GetMessagesAction())
  }
}
