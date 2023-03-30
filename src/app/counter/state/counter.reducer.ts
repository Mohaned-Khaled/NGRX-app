import { createReducer, on } from '@ngrx/store';
import {
  changeMessage,
  customIncrease,
  decreaseCounter,
  increaseCounter,
  resetCounter,
} from './counter.actions';

export interface CounterState {
  counter: number;
  appMsg: string;
}

const initialState: CounterState = {
  counter: 1,
  appMsg: 'Mohanad App',
};

const _counterReducer = createReducer(
  initialState,
  on(increaseCounter, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decreaseCounter, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(resetCounter, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrease, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }),
  on(changeMessage, (state) => {
    return {
      ...state,
      appMsg: state.appMsg === 'Mohanad App' ? 'NGRX APP' : 'Mohanad App',
    };
  })
);

export const counterReducer = (state: CounterState, action) => {
  return _counterReducer(state, action);
};
