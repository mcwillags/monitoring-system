import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AdminCredentials,
  AuthResponse,
  IAdmin,
  IObserver,
  ObserverCredentials,
  RegisterAdminCredentials,
  TokenAuthResponse,
  UserRole,
} from '@models';

import { axios } from '@utils';

import { environment } from '@src/environment';

export const loginAdmin = createAsyncThunk(
  'auth/admin/login',
  async (body: AdminCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse<IAdmin>>('auth/login', {
        ...body,
        role: UserRole.ADMIN,
      });

      localStorage.setItem(environment.tokenKey, data.token);

      await new Promise((res) => setTimeout(res, 1000));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const loginObserver = createAsyncThunk(
  'auth/observer/login',
  async (body: ObserverCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse<IObserver>>('auth/login', {
        ...body,
        role: UserRole.OBSERVER,
      });

      localStorage.setItem(environment.tokenKey, data.token);

      await new Promise((res) => setTimeout(res, 1000));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const registerAdmin = createAsyncThunk(
  'auth/admin/register',
  async (body: RegisterAdminCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse<IAdmin>>('auth/register/admin', body);

      localStorage.setItem(environment.tokenKey, data.token);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const proceedAuth = createAsyncThunk('auth/token', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<TokenAuthResponse<IAdmin | IObserver>>('auth');

    const token = localStorage.getItem(environment.tokenKey);

    return { ...data, token };
  } catch (err: any) {
    return rejectWithValue(null);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem(environment.tokenKey);
  } catch (error) {
    return rejectWithValue(null);
  }
});
