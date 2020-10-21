import { createReducer, on } from '@ngrx/store';
import * as ChatActions from 'src/app/store/actions/chat.actions';
import { Message } from 'src/app/store/models/message.model';
import { User } from '../models/user.model';

// Store Shape

export interface ChatShape {
  messages: Message[];
  isLoaded: boolean;
  isLoading: boolean;
  token: string;
  isLogged: boolean;
  user: User;
}

// Selectors

export const selectMessages = (state: ChatShape) => state.messages;
export const selectIsLoading = (state: ChatShape) => state.isLoading;
export const selectIsLoaded = (state: ChatShape) => state.isLoaded;
export const selectIsLogged = (state: ChatShape) => state.isLogged;
export const selectUser = (state: ChatShape) => state.user;
export const selectUserId = (state: ChatShape) => state.user.id;

// Reducer

export const initialChatState: ChatShape = {
  messages: [],
  isLoaded: false,
  isLoading: false,
  token: '',
  isLogged: false,
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
      const newState = { ...state, isLoading: true, isLoaded: false};
      console.log(newState);
      return newState;
    }
  ),
  on(
    ChatActions.GetMessagesSuccessAction, (state, action): ChatShape => {
      const newState = { ...state, messages: [...action.messages, ...state.messages], isLoading: false, isLoaded: true };
      console.log(newState);
      return newState;
    }
  ),
  on(
    ChatActions.GetMessagesFailAction, (state, action): ChatShape => {
      const newState = { ...state, messages: action.messages, isLoading: false, isLoaded: false };
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
    ChatActions.GoogleAuthAction, (state, action): ChatShape => {
      const newState = { ...state, token: action.token };
      localStorage.setItem('token', action.token);
      console.log(newState);
      return newState;
    }
  ),

  on(
    ChatActions.GoogleAuthSuccessAction, (state, action): ChatShape => {
      const newState = { ...state, user: action.user, isLogged: true };
      console.log(newState);
      return newState;
    }
  ),

  on(
    ChatActions.GoogleAuthFailAction, (state): ChatShape => {
      const newState = { ...state, user: initialChatState.user, isLogged: false };
      console.log(newState);
      return newState;
    }
  )

)
