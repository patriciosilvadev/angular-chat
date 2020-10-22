import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleAuthAction } from 'src/app/store/actions/chat.actions';
import { selectIsLogged } from './store/states/chat.state'
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div *ngIf="!(isLoggedIn$ | async)" class="center background-pattern">
        <div id="gSignInWrapper">
          <div id="customBtn" (click)='signInWithGoogle()' class="customGPlusSignIn">
            <img src="assets/google_icon.png" class="icon">
            <span class="buttonText">Continue with Google</span>
          </div>
        </div>
      </div>
      <div *ngIf="(isLoggedIn$ | async)">
        <app-chat-timeline></app-chat-timeline>
        <app-chat-input></app-chat-input>
      </div>
    </div>
  `,
  styles: [
  `
    .center{
      min-height: 100vh;
      min-width: 100vw;
      text-align: center;
      vertical-align: middle;
    }
    #customBtn {
      margin-top: calc(50vh - 26px);
      display: inline-block;
      background: white;
      color: #444;
      width: 240px;
      border-radius: 5px;
      border: thin solid #888;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }
    #customBtn:active {
      box-shadow: none;
    }
    img.icon {
      padding: 10px 0;
      display: inline-block;
      vertical-align: middle;
      width: 30px;
      height: 30px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      padding-left: 10px;
      font-size: 18px;
      font-weight: bold;
      font-family: 'Roboto', sans-serif;
      }
    `
  ],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store,
    private authService: SocialAuthService
  ) {}

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLogged);

    const oldToken = localStorage.getItem('token');
    if (oldToken) {
      this.store.dispatch(GoogleAuthAction(oldToken));
    }

    this.authService.authState.subscribe((user) => {
      this.store.dispatch(GoogleAuthAction(user.idToken));
    });
  }
}
