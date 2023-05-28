import { UserRole } from './user.role';

export interface IObserver {
  _id: string;
  email: string;
  region: string;
  role: UserRole.OBSERVER;
}

export interface CreateObserver {
  email: string;
  password: string;
  region: string;
}

export interface ObserverInitialState {
  error: string | null;
  brigades: string[];
  isLoading: boolean;
  monitoringBrigade: string | null;
  connectionRoom: string | null;
}

export interface ChangePasswordCredentials {
  password: string;
  newPassword: string;
}
