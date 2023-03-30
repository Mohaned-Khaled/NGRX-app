import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN_ACTION = '[auth page] LOGIN_ACTION';
export const LOGIN_SUCCESS = '[auth page] LOGIN_SUCCESS';
export const AUTO_LOGIN = '[auth page] AUTO_LOGIN';

export const SIGNUP_ACTION = '[auth page] SIGNUP_ACTION';
export const SIGNYP_SUCCESS = '[auth page] SIGNYP_SUCCESS';

export const LOGOUT_ACTION = '[auth page] LOGOUT_ACTION';

export const loginStart = createAction(
  LOGIN_ACTION,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN);

export const signupStart = createAction(
  SIGNUP_ACTION,
  props<{ email: string; password: string }>()
);
export const signupSuccess = createAction(
  SIGNYP_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const logoutAction = createAction(LOGOUT_ACTION);
