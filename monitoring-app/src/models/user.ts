import { AuthLoading } from '@src/models/auth';

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  brigadeNumber: string;
  badgeNumber: string;
  region: string;
}

export interface MonitoringSettings {
  maxHeartRateLevel: number;
  minOxygenLevel: number;
  maxTemperatureLevel: number;
}

export interface MonitoringSettingsResponse {
  monitoringSettings: MonitoringSettings;
}

export interface ChangeUserBrigade {
  brigadeNumber: string;
}

export interface UserState {
  user: IUser | null;
  token: string | null;
  error: string | null;
  loading: AuthLoading | UserLoadingStates;
  tokenAuthDone: boolean;
  monitoringSettings: MonitoringSettings | null;
  isMonitoring: boolean;
  connectionRoomCode: string | null;
}

export interface CreateUser {
  email: string;
  password: string;
  fullName: string;
  brigadeNumber: string;
  badgeNumber: string;
  region: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

export enum UserLoadingStates {
  LOADING_AUTH = 'LOADING_AUTH',
  LOADING_REGIONS = 'LOADING_REGIONS',
  LOADING_MONITORING_SETTINGS = 'LOADING_MONITORING_SETTINGS',
  CHANGING_MONITORING_SETTINGS = 'CHANGING_MONITORING_SETTINGS',
  CHANGING_PASSWORD = 'CHANGING_PASSWORD',
  CHANGING_BRIGADE = 'CHANGING_BRIGADE',
  NONE = 'NONE',
}
