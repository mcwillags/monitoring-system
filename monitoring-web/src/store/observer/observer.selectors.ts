import { RootState } from '@store';
import { createSelector } from '@reduxjs/toolkit';

const selectFeature = (state: RootState) => state.observer;

export const selectObserverError = createSelector(selectFeature, (state) => state.error);
export const selectObserverBrigades = createSelector(selectFeature, (state) => state.brigades);
export const selectObserverMonitoringBrigade = createSelector(
  selectFeature,
  (state) => state.monitoringBrigade,
);

export const selectObserverConnectionRoom = createSelector(
  selectFeature,
  (state) => state.connectionRoom,
);
