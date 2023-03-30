import { authReducer, AuthState } from '../auth/state/auth.reducer';
import { sharedReducer, SharedState } from './shared/shared.reducer';

export interface AppState {
  shared: SharedState;
  auth: AuthState;
}

export const appReducer = {
  shared: sharedReducer,
  auth: authReducer,
};
