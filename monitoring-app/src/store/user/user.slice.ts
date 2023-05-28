import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonitoringSettings, UserLoadingStates, UserState } from '@models';
import {
  authUser,
  changeMonitoringSettings,
  changePassword,
  changeUserBrigade,
  getMonitoringSettings,
  loginUser,
  logOut,
  registerUser,
} from './user.action.creators';
import { AuthLoading, UserResponse } from '@src/models/auth';

const initialState: UserState = {
  error: null,
  token: null,
  user: null,
  loading: AuthLoading.NONE,
  tokenAuthDone: false,
  monitoringSettings: null,
  isMonitoring: false,
  connectionRoomCode: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setIsMonitoring: (state, { payload }: PayloadAction<boolean>) => {
      state.isMonitoring = payload;
    },
    setConnectionRoomCode: (state, {payload}: PayloadAction<string | null>) => {
      state.connectionRoomCode = payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // REGISTER *************************************************

      .addCase(registerUser.pending.type, (state) => {
        state.loading = AuthLoading.LOADING_AUTH;
      })
      .addCase(registerUser.fulfilled.type, (state, action: PayloadAction<UserResponse>) => {
        state.loading = AuthLoading.NONE;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected.type, (state) => {
        state.loading = AuthLoading.NONE;
      })

      // LOGIN *************************************************

      .addCase(loginUser.pending.type, (state) => {
        state.loading = AuthLoading.LOADING_AUTH;
      })
      .addCase(loginUser.fulfilled.type, (state, action: PayloadAction<UserResponse>) => {
        state.loading = AuthLoading.NONE;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected.type, (state) => {
        state.loading = AuthLoading.NONE;
      })

      // LOGOUT  *************************************************

      .addCase(logOut.pending.type, (state) => {
        state.loading = AuthLoading.NONE;
      })
      .addCase(logOut.fulfilled.type, (state, action: PayloadAction<UserResponse>) => {
        state.error = null;
        state.token = null;
        state.user = null;
        state.loading = AuthLoading.NONE;
        state.tokenAuthDone = false;
        state.monitoringSettings = null;
        state.isMonitoring = false;
        state.connectionRoomCode = null;
      })
      .addCase(logOut.rejected.type, (state) => {
        state.error = null;
        state.token = null;
        state.user = null;
        state.loading = AuthLoading.NONE;
        state.tokenAuthDone = false;
        state.monitoringSettings = null;
        state.isMonitoring = false;
        state.connectionRoomCode = null;
      })

      // USER CHANGE CHANGE USER BRIGADE  *************************************************

      .addCase(changeUserBrigade.pending.type, (state) => {
        state.loading = UserLoadingStates.CHANGING_BRIGADE;
      })
      .addCase(changeUserBrigade.fulfilled.type, (state, { payload }: PayloadAction<string>) => {
        state.loading = UserLoadingStates.NONE;
        if (state.user) {
          state.user.brigadeNumber = payload;
        }
      })
      .addCase(changeUserBrigade.rejected.type, (state) => {
        state.loading = UserLoadingStates.NONE;
      })

      // USER CHANGE PASSWORD  *************************************************

      .addCase(changePassword.pending.type, (state) => {
        state.loading = UserLoadingStates.CHANGING_PASSWORD;
      })
      .addCase(changePassword.fulfilled.type, (state) => {
        state.loading = UserLoadingStates.NONE;
      })
      .addCase(changePassword.rejected.type, (state) => {
        state.loading = UserLoadingStates.NONE;
      })

      // USER CHANGE MONITORING SETTINGS  ************************************************* getMonitoringSettings

      .addCase(getMonitoringSettings.pending.type, (state) => {
        state.loading = UserLoadingStates.LOADING_MONITORING_SETTINGS;
      })
      .addCase(
        getMonitoringSettings.fulfilled.type,
        (state, { payload }: PayloadAction<MonitoringSettings>) => {
          state.loading = UserLoadingStates.NONE;
          state.monitoringSettings = payload;
        }
      )
      .addCase(getMonitoringSettings.rejected.type, (state) => {
        state.loading = UserLoadingStates.NONE;
      })

      // USER CHANGE MONITORING SETTINGS  *************************************************

      .addCase(changeMonitoringSettings.pending.type, (state) => {
        state.loading = UserLoadingStates.CHANGING_MONITORING_SETTINGS;
      })
      .addCase(
        changeMonitoringSettings.fulfilled.type,
        (state, { payload }: PayloadAction<MonitoringSettings>) => {
          state.loading = UserLoadingStates.NONE;
          state.monitoringSettings = payload;
        }
      )
      .addCase(changeMonitoringSettings.rejected.type, (state) => {
        state.loading = UserLoadingStates.NONE;
      })

      // AUTH *************************************************

      .addCase(authUser.pending.type, (state) => {
        state.loading = AuthLoading.LOADING_TOKEN_AUTH;
      })
      .addCase(authUser.fulfilled.type, (state, action: PayloadAction<UserResponse>) => {
        state.loading = AuthLoading.NONE;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.tokenAuthDone = true;
      })
      .addCase(authUser.rejected.type, (state) => {
        state.loading = AuthLoading.NONE;
        state.tokenAuthDone = true;
      });
  },
});

export default userSlice.reducer;
export const { clearError, setIsMonitoring, setConnectionRoomCode } = userSlice.actions;
