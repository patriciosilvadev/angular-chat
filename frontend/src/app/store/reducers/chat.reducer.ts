import { createReducer, on } from '@ngrx/store';
import * as ChatActions from 'src/app/store/actions/chat.actions';
import { Message } from 'src/app/store/models/message.model';
import { User } from '../models/user.model';

// Store Shape

export interface ChatShape {
  messages: Message[];
  loaded: boolean;
  loading: boolean;
  logged: boolean;
  user: User;
}

// Selectors

export const selectMessages = (state: ChatShape) => state.messages;
export const selectLoading = (state: ChatShape) => state.loading;
export const selectLoaded = (state: ChatShape) => state.loaded;
export const selectLogged = (state: ChatShape) => state.logged;
export const selectUser = (state: ChatShape) => state.user;
export const selectUserId = (state: ChatShape) => state.user.id;

// Reducer

export const initialChatState: ChatShape = {
  messages: [],
  loaded: false,
  loading: false,
  logged: false,
  user: {
    id: -1,
    name: '',
    email: '',
    picture: '',
    createdAt: 0,
  },
}

export const chatReducer = createReducer(
  initialChatState,

  // LOAD OLD MESSAGES

  on(
    ChatActions.GetMessagesAction, (state): ChatShape => {
      const newState = { ...state, loading: true, loaded: false };
      console.log(newState);
      return newState;
    }
  ),
  on(
    ChatActions.GetMessagesSuccessAction, (state, action): ChatShape => {
      const newState = { ...state, messages: action.messages, loading: false, loaded: true };
      console.log(newState);
      return newState;
    }
  ),
  on(
    ChatActions.GetMessagesFailAction, (state, action): ChatShape => {
      const newState = { ...state, messages: action.messages, loading: false, loaded: false };
      console.log(newState);
      return newState;
    }
  ),

  // SEND NEW MESSAGE

  // RECEIVE NEW MESSAGES

  on(
    ChatActions.NewMessageSuccessAction, (state, action): ChatShape => {
      const newState = { ...state, messages: [...state.messages, action.message] };
      console.log(newState);
      return newState;
    }
  ),

  // GOOGLE AUTH

  on(
    ChatActions.GoogleAuthSuccessAction, (state, action): ChatShape => {
      const newState = { ...state, user: action.user, logged: true };
      console.log(newState);
      return newState;
    }
  ),

  on(
    ChatActions.GoogleAuthFailAction, (state): ChatShape => {
      const newState = { ...state, user: initialChatState.user, logged: initialChatState.logged };
      console.log(newState);
      return newState;
    }
  )

)
