import AsyncStorage from '@react-native-async-storage/async-storage';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  MonitoringSettings,
  ChangePasswordData,
  CreateUser,
  UserCredentials,
  MonitoringSettingsResponse,
  ChangeUserBrigade,
  AuthResponse,
  UserResponse,
} from '@models';

import { axios, createToastSuccess, createToastError } from '@utils';

import { environment } from '@src/environment';


export const loginUser = createAsyncThunk(
  'auth/login',
  async (body: UserCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserResponse>('/auth/login', { ...body, role: 'user' });

      createToastSuccess('Вітання!');

      await AsyncStorage.setItem(environment.tokenKey, data.token);

      return data;
    } catch (err: any) {
      createToastError('Не вдалось ввійти');
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (body: CreateUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<UserResponse>('/auth/register/user', body);

      await AsyncStorage.setItem(environment.tokenKey, data.token);

      createToastSuccess('З поверненням!');

      return data;
    } catch (err: any) {
      createToastError('Не вдалось зареєструвати користувача');
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const authUser = createAsyncThunk('auth', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<AuthResponse>('/auth');

    const token = await AsyncStorage.getItem(environment.tokenKey);

    return { ...data, token };
  } catch (err: any) {
    await AsyncStorage.removeItem(environment.tokenKey);
    return rejectWithValue(err.response.data.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await AsyncStorage.removeItem(environment.tokenKey);
  } catch (err) {
    await AsyncStorage.removeItem(environment.tokenKey);
    return rejectWithValue(null);
  }
});

export const changePassword = createAsyncThunk(
  'user/password',
  async (body: ChangePasswordData, { rejectWithValue }) => {
    try {
      await axios.patch('user/password', body);

      createToastSuccess('Пароль був успішно змінений!');

      return true;
    } catch (err: any) {
      createToastError(err.response.data.message);
      rejectWithValue(null);
    }
  }
);

export const changeMonitoringSettings = createAsyncThunk(
  'user/change-monitoring-settings',
  async (body: MonitoringSettings, { rejectWithValue }) => {
    try {
      const { data } = await axios.put<MonitoringSettingsResponse>(
        'user/monitoring-settings',
        body
      );

      createToastSuccess('Налаштування моніторингу було змінено!');

      return data.monitoringSettings;
    } catch (err: any) {
      createToastError('Не вдалось змінити налаштування моніторингу');
      return rejectWithValue(null);
    }
  }
);

export const getMonitoringSettings = createAsyncThunk(
  'user/get-monitoring-settings',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<MonitoringSettingsResponse>('user/monitoring-settings');

      await new Promise((res) => setTimeout(res, 2000));

      return data.monitoringSettings;
    } catch (err: any) {
      createToastError(`Не вдалось завантажити налаштування моніторингу`);
      return rejectWithValue(null);
    }
  }
);

export const changeUserBrigade = createAsyncThunk(
  'user/change-user-brigade',
  async (body: ChangeUserBrigade, { rejectWithValue }) => {
    try {
      await axios.patch('user/brigade', body);

      createToastSuccess('Номер бригади змінено');

      return body.brigadeNumber;
    } catch (err: any) {
      createToastError('Не вдалось змінити номер бригади');
      return rejectWithValue(null);
    }
  }
);
