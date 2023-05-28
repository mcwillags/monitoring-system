import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeObserverPassword, getObserverBrigades } from './observer.action.creators';
import { ObserverInitialState } from '@models';

const initialState: ObserverInitialState = {
  error: null,
  isLoading: false,
  brigades: [],
  monitoringBrigade: null,
  connectionRoom: null,
};

export const observerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearObserverError: (state) => {
      state.error = null;
    },
    clearObserverState: (state) => {
      state.error = null;
      state.isLoading = false;
      state.brigades = [];
      state.monitoringBrigade = null;
      state.connectionRoom = null;
    },
    setMonitoringBrigade: (state, { payload }: PayloadAction<string | null>) => {
      state.monitoringBrigade = payload;
    },
    setObserverConnectionRoom: (state, { payload }: PayloadAction<string | null>) => {
      state.connectionRoom = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getObserverBrigades.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getObserverBrigades.fulfilled.type,
        (state, { payload }: PayloadAction<string[]>) => {
          state.isLoading = false;
          state.brigades = payload;
        },
      )
      .addCase(getObserverBrigades.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Change password *************************

      .addCase(changeObserverPassword.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(changeObserverPassword.fulfilled.type, (state) => {
        state.isLoading = false;
      })
      .addCase(
        changeObserverPassword.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = payload;
        },
      );
  },
});

export default observerSlice.reducer;
export const {
  clearObserverError,
  clearObserverState,
  setMonitoringBrigade,
  setObserverConnectionRoom,
} = observerSlice.actions;
