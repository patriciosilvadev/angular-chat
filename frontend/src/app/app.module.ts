import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from "angularx-social-login";

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { ChatEffects } from 'src/app/store/effects/chat.effects';
import { reducers } from 'src/app/store/states/chat.state';

import { AppComponent } from 'src/app/app.component';
import { ChatInputComponent } from 'src/app/components/chat-input.component';
import { ChatTimelineComponent } from 'src/app/components/chat-timeline.component';
import { ChatMessageComponent } from 'src/app/components/chat-message.component';

import { GraphQLModule } from 'src/app/services/graphql/graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatInputComponent,
    ChatTimelineComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([ChatEffects]),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_client_id
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
