import { createAction } from '@ngrx/store';
import { Message } from 'src/app/store/models/message.model'
import { User } from 'src/app/store/models/user.model'

// LOAD OLD MESSAGES

export const GetMessagesAction = createAction(
  '[Chat] Get Messages'
);

export const GetMessagesSuccessAction = createAction(
  '[Chat] Get Messages Success', (messages: Message[]) => ({ messages })
);

export const GetMessagesFailAction = createAction(
  '[Chat] Get Messages Fail', (messages: Message[]) => ({ messages })
);

// SEND NEW MESSAGE

export const SendMessageAction = createAction(
  '[Chat] Send Message', (content: string, user: number) => ({ content, user })
);

export const SendMessageSuccessAction = createAction(
  '[Chat] Send Message Success', (message: Message) => ({ message })
);

export const SendMessageFailAction = createAction(
  '[Chat] Send Message Fail'
);

// RECEIVE NEW MESSAGES

export const NewMessageSuccessAction = createAction(
  '[Chat] New Message Success', (message: Message) => ({ message })
);

export const NewMessageFailAction = createAction(
  '[Chat] New Message Fail'
);

// GOOGLE AUTH

export const GoogleAuthAction = createAction(
  '[Chat] Google Auth', (token: string) => ({ token })
);

export const GoogleAuthSuccessAction = createAction(
  '[Chat] Google Auth Success', (user: User) => ({ user })
);

export const GoogleAuthFailAction = createAction(
  '[Chat] Google Auth Fail'
)
