import { IAdmin } from './admin.model';
import { IObserver } from './observer.model';

export interface RegisterAdminCredentials {
  email: string;
  password: string;
  registerCode: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface ObserverCredentials {
  email: string;
  password: string;
}

export interface AuthInitialState {
  user: IAdmin | IObserver | null;
  error: string | null;
  isLoading: boolean;
  token: string | null;
}

export interface AuthResponse<T> {
  user: T;
  token: string;
}

export interface TokenAuthResponse<T> {
  user: T;
}