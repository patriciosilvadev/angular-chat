import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { GetMessagesQueryGQLService as GetMessagesService } from 'src/app/services/graphql/get-messages-query-gql.service';
import { SendMessageMutationGQLService as SendMessageService } from 'src/app/services/graphql/send-message-mutation-gql.service';
import { NewMessageSubscriptionGQLService as NewMessageService } from 'src/app/services/graphql/new-message-subscription-gql.service';
import { GoogleAuthMutationGQLService as GoogleAuthService } from 'src/app/services/graphql/google-auth-mutation-gql.service';
import * as chatActions from 'src/app/store/actions/chat.actions';

@Injectable()
export class ChatEffects {

  constructor(
    readonly actions$: Actions,
    readonly getMessagesService: GetMessagesService,
    readonly sendMessageService: SendMessageService,
    readonly newMessageService: NewMessageService,
    readonly googleAuthService: GoogleAuthService,
  ) {}

  getMessages$ = createEffect(() => {
    // All actions fired pass through actions$
    return this.actions$.pipe(
      // Listen to this type of action
      ofType(chatActions.GetMessagesAction),
      exhaustMap(() => {
        // Issue a graphql request
        return this.getMessagesService.fetch().pipe(
          // Map the answer to another action
          map(({data}) => chatActions.GetMessagesSuccessAction(data.getMessages)),
          catchError((error) => {
            console.error('[CHAT EFFECTS - getMessages]\n',error);
            return of(chatActions.GetMessagesFailAction([]));
          })
        )
      })
    )
  })

  sendMessage$ = createEffect(() => {
    // All actions fired pass through actions$
    return this.actions$.pipe(
      // Listen to this type of action
      ofType(chatActions.SendMessageAction),
      concatMap(({ content, user }) => {
        // Issue a graphql request
        return this.sendMessageService.mutate({ content, user }).pipe(
          // Map the answer to another action in case of success
          map(({data}) => (chatActions.SendMessageSuccessAction(data.sendMessage))),
          // Map the answer to another action in case of error
          catchError((error) => {
            console.error('[CHAT EFFECTS - sendMessage]\n',error);
            return of(chatActions.SendMessageFailAction());
          })
        )
      })
    )
  })

  newMessages$ = createEffect(() => {
    // All actions fired pass through actions$
    return this.actions$.pipe(
      // Listen to this type of action
      ofType(chatActions.GetMessagesAction),
      exhaustMap(() => {
        // Issue a graphql request
        return this.newMessageService.subscribe().pipe(
          // Map the answer to another action
          map(({data}) => chatActions.NewMessageSuccessAction(data.newMessage)),
          catchError((error) => {
            console.error('[CHAT EFFECTS - newMessages]\n',error);
            return of(chatActions.NewMessageFailAction());
          })
        )
      })
    )
  })

  googleAuth$ = createEffect(() => {
    // All actions fired pass through actions$
    return this.actions$.pipe(
      // Listen to this type of action
      ofType(chatActions.GoogleAuthAction),
      exhaustMap(({ token }) => {
        // Issue a graphql request
        return this.googleAuthService.mutate({ token }).pipe(
          // Map the answer to another action
          map(({data}) => (chatActions.GoogleAuthSuccessAction(data.setUser))),
          catchError((error) => {
            console.error('[CHAT EFFECTS - googleAuth]\n',error);
            return of(chatActions.GoogleAuthFailAction());
          })
        )
      })
    )
  })

}

// exhaustMap: (POST REQUESTS) waits for the inner observable to complete before it let anything else happen, so it dont let any other requests accumulate in the line
// concatMap: build a backlog of requests were order is important
// mergeMap: build a backlog of requests with no defined order
