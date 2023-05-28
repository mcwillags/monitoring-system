import { createSelector } from '@reduxjs/toolkit';

import { UserLoadingStates } from '@models';

import { RootState } from '@store';


const selectFeature = (state: RootState) => state.user;

export const selectIsAuth = createSelector(selectFeature, (state) => !!state.token);
export const selectUser = createSelector(selectFeature, (state) => state.user);
export const selectTokenAuthDone = createSelector(selectFeature, (state) => state.tokenAuthDone);
export const selectUserRegion = createSelector(selectFeature, (state) => state.user?.region);
export const selectUserBrigadeNumber = createSelector(
  selectFeature,
  (state) => state.user?.brigadeNumber
);
export const selectIsMonitoring = createSelector(selectFeature, (state) => state.isMonitoring);
export const selectMonitoringSettingsLoading = createSelector(
  selectFeature,
  (state) => state.loading === UserLoadingStates.LOADING_MONITORING_SETTINGS
);
export const selectMonitoringSettings = createSelector(
  selectFeature,
  (state) => state.monitoringSettings
);
export const selectConnectionRoomCode = createSelector(selectFeature, (state) => state.connectionRoomCode);