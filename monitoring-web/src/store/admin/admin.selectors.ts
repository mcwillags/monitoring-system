import { RootState } from '@store';
import { createSelector } from '@reduxjs/toolkit';
import { AdminLoadingStates } from '@models';

const selectFeature = (state: RootState) => state.admin;

export const selectAdminAvailableRegions = createSelector(selectFeature, (state) => state.regions);
export const selectIsAdminCreatingObserver = createSelector(
  selectFeature,
  (state) => state.isLoading === AdminLoadingStates.CREATING_OBSERVER,
);
export const selectIsAdminChangingRegion = createSelector(
  selectFeature,
  (state) => state.isLoading === AdminLoadingStates.CHANGING_OBSERVER_REGION,
);
export const selectIsAdminLoadingObservers = createSelector(
  selectFeature,
  (state) => state.isLoading === AdminLoadingStates.LOADING_OBSERVERS,
);
export const selectAdminError = createSelector(selectFeature, (state) => state.error);
export const selectAdminObservers = createSelector(selectFeature, (state) => state.observers);
