import { RootState } from '@store';
import { createSelector } from '@reduxjs/toolkit';
import {IObserver, UserRole} from '@models';

const selectFeauture = (state: RootState) => state.auth;

export const selectAuthError = createSelector(selectFeauture, (state) => state.error);
export const selectAuthIsLoading = createSelector(selectFeauture, (state) => state.isLoading);
export const selectIsAuth = createSelector(selectFeauture, (state) => !!state.token);
export const selectObserverRegion = createSelector(selectFeauture, (state) => (state.user as IObserver).region);

export const selectUserIsObserver = createSelector(
  selectFeauture,
  (state) => state.user?.role === UserRole.OBSERVER,
);

export const selectAuthRole = createSelector(selectFeauture, (state) => state.user?.role);
export const selectUserId = createSelector(selectFeauture, (state) => state.user?._id);