import { AuthInitialState, AuthResponse, IAdmin, IObserver } from '@models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAdmin, loginObserver, logOut, proceedAuth } from './auth.action.creators';
import { registerAdmin } from './auth.action.creators';

const initialState: AuthInitialState = {
  user: null,
  error: null,
  isLoading: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN OBSERVER *******************************

      .addCase(loginObserver.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginObserver.fulfilled.type,
        (state, { payload }: PayloadAction<AuthResponse<IObserver>>) => {
          state.isLoading = false;
          state.token = payload.token;
          state.user = payload.user;
        },
      )
      .addCase(loginObserver.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = payload;
      })

      // LOGIN ADMIN *******************************

      .addCase(loginAdmin.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginAdmin.fulfilled.type,
        (state, { payload }: PayloadAction<AuthResponse<IAdmin>>) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;
        },
      )
      .addCase(loginAdmin.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = payload;
      })

      // REGISTER ADMIN *******************************

      .addCase(registerAdmin.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerAdmin.fulfilled.type,
        (state, { payload }: PayloadAction<AuthResponse<IAdmin>>) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;
        },
      )
      .addCase(registerAdmin.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = payload;
      })

      // LOG OUT *******************************
      .addCase(proceedAuth.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        proceedAuth.fulfilled.type,
        (state, { payload }: PayloadAction<AuthResponse<IAdmin | IObserver>>) => {
          state.isLoading = false;
          state.user = payload.user;
          state.token = payload.token;
        },
      )
      .addCase(proceedAuth.rejected.type, (state) => {
        state.isLoading = false;
      })

      // LOG OUT *******************************

      .addCase(logOut.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled.type, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logOut.rejected.type, (state) => {
        state.isLoading = false;
        state.error = null;
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
export const { clearAuthError } = authSlice.actions;
