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

export const selectIsLoading = createSelector(
  selectChatState,
  ChatState.selectIsLoading
);

export const selectIsLoaded = createSelector(
  selectChatState,
  ChatState.selectIsLoaded
);

export const selectIsLogged = createSelector(
  selectChatState,
  ChatState.selectIsLogged
);

export const selectUser = createSelector(
  selectChatState,
  ChatState.selectUser
);

export const selectUserId = createSelector(
  selectChatState,
  ChatState.selectUserId
);
