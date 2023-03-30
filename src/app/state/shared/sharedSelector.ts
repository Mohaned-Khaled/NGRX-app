import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.reducer';

export const getSharedSelector = createFeatureSelector<SharedState>('shared');

export const getShowLoading = createSelector(
  getSharedSelector,
  (state: SharedState) => {
    return state.showLoading;
  }
);

export const getErrorMessage = createSelector(getSharedSelector, (state) => {
  return state.errorMsg;
});
