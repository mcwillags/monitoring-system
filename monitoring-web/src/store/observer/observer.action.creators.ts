import { createAsyncThunk } from '@reduxjs/toolkit';

import { ChangePasswordCredentials, GetBrigadesRequest, GetBrigadesResponse } from '@models';

import { axios } from '@utils';

export const getObserverBrigades = createAsyncThunk(
  'observer/get-brigades',
  async (body: GetBrigadesRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<GetBrigadesResponse>('user/brigades', body);

      return data.brigades;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const changeObserverPassword = createAsyncThunk(
  'observer/change-password',
  async (body: ChangePasswordCredentials, { rejectWithValue }) => {
    try {
      await axios.patch('observers/password', body);

      return true;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);
