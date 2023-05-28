import { combineReducers, configureStore } from '@reduxjs/toolkit';
import observerReducer from './observer/observer.slice';
import adminReducer from './admin/admin.slice';
import authSlice from './auth/auth.slice';

const reducers = combineReducers({
    observer: observerReducer,
    admin: adminReducer,
    auth: authSlice,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
