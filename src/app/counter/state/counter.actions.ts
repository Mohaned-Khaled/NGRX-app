import { createAction, props } from '@ngrx/store';

export const INCREASE_COUNTER = '[counter page] INCREASE_COUNTER';
export const CUSTOM_INCREASE = '[counter page] CUSTOM_INCREASE';

export const DECREASE_COUNTER = '[counter page] DECREASE_COUNTER';
export const RESET_COUNTER = '[counter page] RESET_COUNTER';

export const CHANGE_MSG = '[counter page] CHANGE_MSG';

export const increaseCounter = createAction(INCREASE_COUNTER);

export const customIncrease = createAction(
  CUSTOM_INCREASE,
  props<{ value: number }>()
);

export const decreaseCounter = createAction(DECREASE_COUNTER);

export const resetCounter = createAction(RESET_COUNTER);

export const changeMessage = createAction(CHANGE_MSG);
