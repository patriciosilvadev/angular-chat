import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Message } from 'src/app/store/models/message.model';
import { Store } from '@ngrx/store';
import { selectMessages, selectIsLoading, selectIsLoaded, selectUserId, selectFixBottomLockedScroll } from 'src/app/store/states/chat.state';
import { GetMessagesAction, SetBottomLockedAction } from 'src/app/store/actions/chat.actions';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-chat-timeline',
  template: `
    <div #chatTimeline *ngIf="isLoaded" class="chat-timeline">
      <div *ngFor="let msg of messages; index as messageIndex;" [className]="isMyMessage(msg.user.id) ? 'msg-right' : 'msg-left'">
        <div class="chat-date" *ngIf="isDiferentDay(messageIndex)"><span class='background-blurred'>{{ msg.createdAt | date:'dd/MM' }}</span></div>
        <app-chat-message class="message" [chatMessage]="msg" [myMsg]="isMyMessage(msg.user.id)" [first]="isFirstMessage(messageIndex) || isDiferentDay(messageIndex)"></app-chat-message>
      </div>
    </div>
    <div *ngIf="isLoading" class='loading-screen chat-timeline'>
      <p>LOADING MESSAGES</p>
    </div>
  `,
  styles: [
    `
      /* DATE */
      .chat-timeline .chat-date {
        text-align: center;
      }
      .chat-timeline .chat-date span {
        margin: 5px 0;
        padding: 5px 10px;
        display: inline-block;
        border-radius: var(--any-msg-border-radius);
        color: var(--input-message-font-color);
        font-size: 20px;
      }
      /* TIMELINE */
      .chat-timeline {
        min-height: calc(100vh - 55px);
        padding-bottom: 55px;
      }
      /* MESSAGES */
      .chat-timeline .message {
        max-width: 70%;
        display: inline-block;
        margin: 5px 0px;
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
  @ViewChild('chatTimeline') timeline: ElementRef<HTMLDivElement>;

  public messages: Message[];
  public isLoading: boolean;
  public isLoaded: boolean;
  private userId: number;
  private scroll$: Observable<Event>;
  private resize$: Observable<Event>;

  constructor (private store: Store) {}

  public isMyMessage (messageUserId: number): boolean {
    return messageUserId === this.userId;
  }

  public isDiferentDay (messageIndex: number): boolean {
    const anterior = this.messages[messageIndex-1];
    const atual = this.messages[messageIndex];
    if (!anterior) return true;
    const dataAnterior = new Date(Number(anterior.createdAt));
    const dataAtual = new Date(Number(atual.createdAt))
    if (
      dataAnterior.getDate() !== dataAtual.getDate() ||
      dataAnterior.getMonth() !== dataAtual.getMonth() ||
      dataAnterior.getFullYear() !== dataAtual.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  public isFirstMessage (messageIndex: number): boolean {
    const anterior = this.messages[messageIndex-1];
    const atual = this.messages[messageIndex];
    if (!anterior || anterior.user.id !== atual.user.id) {
      return true;
    } else {
      return false;
    }
  }

  private scrollToBottom (): void {
    const app = document.getElementById('app');
    window.scrollTo({
      top: app.offsetHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private trackScroll (): void {
    const windowHeight = window.innerHeight;
    const data = this.timeline.nativeElement.getBoundingClientRect();
    if (Math.abs(windowHeight - data.bottom) < 5) {
      // TODO action que ativa a variavel bottomLocked
      this.store.dispatch(SetBottomLockedAction(true));
      console.warn("FINAL",data);
    }
    else if (Math.abs(data.height - data.bottom) < 5) {
      // TODO actions que pede mais mensagens
      this.store.dispatch(SetBottomLockedAction(false));
      console.warn("INICIO",data);
    }
    else {
      // TODO actions que desativa bottomLocked
      this.store.dispatch(SetBottomLockedAction(false));
      console.warn("MEIO", data);
    }
  }

  private trackResizeEvent (): void {
    this.resize$ = fromEvent(window, 'resize');
    this.resize$.pipe(debounceTime(1000)).subscribe(() => {
      this.trackScroll();
    })
  }

  private trackScrollEvent (): void {
    this.scroll$ = fromEvent(window, 'scroll');
    this.scroll$.pipe(debounceTime(100)).subscribe(() => {
      this.trackScroll();
    })
  }

  ngOnInit(): void {
    this.trackScrollEvent();
    this.trackResizeEvent();

    this.store.select(selectMessages).subscribe(messages =>
      this.messages = messages
    );
    this.store.select(selectIsLoading).subscribe(isLoading =>
      this.isLoading = isLoading
    );
    this.store.select(selectIsLoaded).subscribe(isLoaded =>
      this.isLoaded = isLoaded
    )
    this.store.select(selectUserId).subscribe(id =>
      this.userId = id
    );

    this.store.select(selectFixBottomLockedScroll).pipe(delay(250))
      .subscribe(fixScroll =>
        fixScroll && this.scrollToBottom()
      );

    this.store.dispatch(GetMessagesAction());
  }
}
