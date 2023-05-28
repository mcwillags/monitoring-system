import { UserRole } from './user.role';
import { IObserver } from './observer.model';

export interface IAdmin {
  _id: string;
  email: string;
  role: UserRole.ADMIN;
}

export enum AdminLoadingStates {
  CREATING_OBSERVER = 'CREATING_OBSERVER',
  LOADING_OBSERVERS = 'LOADING_OBSERVERS',
  CHANGING_OBSERVER_REGION = 'CHANGING_OBSERVER_REGION',
  NONE = 'NONE',
}

export interface AdminInitialState {
  isLoading: AdminLoadingStates;
  error: string | null;
  observers: IObserver[];
  regions: string[];
}

export interface ChangeRegionData {
  _id: string;
  region: string;
}
