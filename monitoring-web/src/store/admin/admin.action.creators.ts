import { createAsyncThunk } from '@reduxjs/toolkit';

import {axios} from '@utils';

import {
  AuthResponse,
  ChangeRegionData,
  CreateObserver,
  IObserver,
  TokenAuthResponse,
} from '@models';

export const createObserver = createAsyncThunk(
  'admin/create/observer',
  async (body: CreateObserver, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<TokenAuthResponse<IObserver>>(
        'auth/register/observer',
        body,
      );

      return data.user;
    } catch (err: any) {
      return rejectWithValue("Не вдалось створити наглядача");
    }
  },
);

export const getAdminAvailableRegions = createAsyncThunk(
  'admin/get-regions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Record<string, string>>('data/available-regions');

      return Object.values(data);
    } catch (err: any) {
      return rejectWithValue('Не вдалось отримати доступні регіони');
    }
  },
);

export const getAdminObservers = createAsyncThunk(
  'admin/get-observers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IObserver[]>('observers');

      await new Promise(res => setTimeout(res, 2000))

      return data;
    } catch (err: any) {
      return rejectWithValue(null);
    }
  },
);

export const changeObserverRegion = createAsyncThunk(
  'admin/observer-region',
  async ({ region, _id }: ChangeRegionData, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch<AuthResponse<IObserver>>(`observers/${_id}`, { region });

      return data.user;
    } catch (err: any) {
      return rejectWithValue(null);
    }
  },
);
