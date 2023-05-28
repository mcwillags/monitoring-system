import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AdminInitialState, AdminLoadingStates, IObserver } from '@models';

import {
  changeObserverRegion,
  createObserver,
  getAdminAvailableRegions,
  getAdminObservers,
} from './admin.action.creators';

const initialState: AdminInitialState = {
  error: null,
  observers: [],
  isLoading: AdminLoadingStates.NONE,
  regions: [],
};

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminState: (state) => {
      state.error = null;
      state.observers = [];
      state.isLoading = AdminLoadingStates.NONE;
      state.regions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createObserver.pending.type, (state) => {
        state.isLoading = AdminLoadingStates.CREATING_OBSERVER;
      })
      .addCase(createObserver.fulfilled.type, (state, { payload }: PayloadAction<IObserver>) => {
        state.isLoading = AdminLoadingStates.NONE;
        state.observers = [payload, ...state.observers];
      })
      .addCase(createObserver.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = AdminLoadingStates.NONE;
        state.error = payload;
      })

      // GET REGIONS

      .addCase(getAdminAvailableRegions.pending.type, (state) => {})
      .addCase(
        getAdminAvailableRegions.fulfilled.type,
        (state, { payload }: PayloadAction<string[]>) => {
          state.regions = payload;
        },
      )
      .addCase(getAdminAvailableRegions.rejected.type, (state) => {})

      // CHANGE OBSERVER REGION
      .addCase(changeObserverRegion.pending.type, (state) => {
        state.isLoading = AdminLoadingStates.CHANGING_OBSERVER_REGION;
      })
      .addCase(
        changeObserverRegion.fulfilled.type,
        (state, { payload }: PayloadAction<IObserver>) => {
          state.isLoading = AdminLoadingStates.NONE;
          console.log(payload);
          state.observers = state.observers.map((observer) =>
            observer._id === payload._id ? payload : observer,
          );
        },
      )
      .addCase(changeObserverRegion.rejected.type, (state) => {
        state.isLoading = AdminLoadingStates.NONE;
      })

      // GET OBSERVERS ******************************************
      .addCase(getAdminObservers.pending.type, (state) => {
        state.isLoading = AdminLoadingStates.LOADING_OBSERVERS;
      })
      .addCase(
        getAdminObservers.fulfilled.type,
        (state, { payload }: PayloadAction<IObserver[]>) => {
          state.isLoading = AdminLoadingStates.NONE;
          state.observers = payload;
        },
      )
      .addCase(getAdminObservers.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = AdminLoadingStates.NONE;
        state.error = payload;
      });
  },
});

export default adminSlice.reducer;
export const { clearAdminError, clearAdminState } = adminSlice.actions;
