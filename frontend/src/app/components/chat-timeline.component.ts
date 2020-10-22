import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/store/models/message.model';
import { Store } from '@ngrx/store';
import { selectMessages, selectIsLoading, selectIsLoaded, selectUserId } from 'src/app/store/states/chat.state';
import { GetMessagesAction } from 'src/app/store/actions/chat.actions';

@Component({
  selector: 'app-chat-timeline',
  template: `
    <div #component (click)='act()' *ngIf="(isLoaded$ | async)" class="chat-timeline background-pattern">
      <!-- <div class='messages-container '> -->
        <!-- <div class="top-container background-blurred">Loading</div> -->
        <div *ngFor="let msg of (messages$ | async)" [className]="isMyMessage(msg.user.id) ? 'msg-right' : 'msg-left'">
          <app-chat-message class="message" [chatMessage]="msg" [myMsg]="isMyMessage(msg.user.id)"></app-chat-message>
        </div>
      <!-- </div> -->
    </div>
    <div *ngIf="(isLoading$ | async)" class='loading-screen chat-timeline'>
      <p>LOADING MESSAGES</p>
    </div>
  `,
  styles: [
    `
      /* TIMELINE */
      .chat-timeline {
        min-height: calc(100vh - 55px);
        padding-bottom: 55px;
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
  @ViewChild('component', {static: false}) component: ElementRef<HTMLElement>;

  public messages$: Observable<Message[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  private userId: number;

  constructor(private store: Store) {}

  public isMyMessage(messageUserId: number): boolean {
    return messageUserId === this.userId;
  }

  // public test = 10;
  // public act() {
  //   console.log('acting');
  //   this.component.nativeElement.style.backgroundPositionX = `${this.test}px`;
  //   this.test += 10
  // }

  ngOnInit(): void {
    this.messages$ = this.store.select(selectMessages);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isLoaded$ = this.store.select(selectIsLoaded);

    this.store.select(selectUserId).subscribe(id => this.userId = id);

    this.store.dispatch(GetMessagesAction());
  }
}
