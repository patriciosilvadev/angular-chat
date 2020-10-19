import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleAuthAction } from 'src/app/store/actions/chat.actions';

// TO LOGIN AND LOGOUT
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div *ngIf="!loggedIn" class="center">
        <button class='google-button' (click)='signInWithGoogle()'>CONTINUE WITH GOOGLE</button>
      </div>
      <div *ngIf="loggedIn">
        <app-chat-timeline></app-chat-timeline>
        <app-chat-input></app-chat-input>
      </div>
    </div>
  `,
  styles: [`
    .login-test * {
      color: white;
    }
    .center{
      min-height: 100vh;
      min-width: 100vw;
      text-align: center;
      vertical-align: middle;
    }
    .google-button {
      margin-top: 45vh;
      padding: 10px 25px;
      font-weight: 900;
      border: 2px solid transparent;
      border-radius: var(--radius1);
      background-color: var(--color3);
      color: var(--background-color1);
      outline: none;
    }
    .google-button:hover {
      cursor: pointer;
      border: 2px solid var(--color3);
      background-color: transparent;
      color: var(--color3);
    }
  `],
})
export class AppComponent implements OnInit {
  loggedIn: boolean;

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
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
      this.store.dispatch(GoogleAuthAction(user.idToken));
    });
  }
}
