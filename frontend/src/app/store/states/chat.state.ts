import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as ChatState from 'src/app/store/reducers/chat.reducer';

export interface AppState {
  chat: ChatState.ChatShape
}

export const reducers: ActionReducerMap<AppState> = {
  chat: ChatState.chatReducer
}

// Global Selectors

export const selectChatState = (state: AppState) => state.chat;

export const selectMessages = createSelector(
  selectChatState,
  ChatState.selectMessages
);

export const selectLoading = createSelector(
  selectChatState,
  ChatState.selectLoading
);

export const selectLoaded = createSelector(
  selectChatState,
  ChatState.selectLoaded
);

export const selectLogged = createSelector(
  selectChatState,
  ChatState.selectLogged
);

export const selectUser = createSelector(
  selectChatState,
  ChatState.selectUser
);

export const selectUserId = createSelector(
  selectChatState,
  ChatState.selectUserId
);
