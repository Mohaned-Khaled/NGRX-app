import { createAction, props } from '@ngrx/store';

export const SHOW_LOADING_ACTION = '[shared page] SHOW_LOADING_ACTION';
export const SHOW_ERROR_MESSAGE = '[shared page] SHOW_ERROR_MESSAGE';

export const showLoadingAction = createAction(
  SHOW_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const showErrorAction = createAction(
  SHOW_ERROR_MESSAGE,
  props<{ message: string }>()
);
