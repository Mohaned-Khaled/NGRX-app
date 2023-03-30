import { createReducer, on } from '@ngrx/store';
import { showErrorAction, showLoadingAction } from './shared.action';

export interface SharedState {
  showLoading: boolean;
  errorMsg: string;
}

export const initialState: SharedState = {
  showLoading: false,
  errorMsg: '',
};

const _sharedReducer = createReducer(
  initialState,
  on(showLoadingAction, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(showErrorAction, (state, action) => {
    return {
      ...state,
      errorMsg: action.message,
    };
  })
);

export const sharedReducer = (state, action) => {
  return _sharedReducer(state, action);
};
