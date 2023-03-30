import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loginSuccess, logoutAction, signupSuccess } from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logoutAction, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export const authReducer = (state, action) => {
  return _authReducer(state, action);
};
