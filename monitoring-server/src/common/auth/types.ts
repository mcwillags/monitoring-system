import { RegionsValues, UserRole } from '../';

export interface JWTUserPayload {
  _id: string;
  email: string;
  fullName: string;
  badgeNumber: string;
  brigadeNumber: string;
  region: RegionsValues;
  role: UserRole;
}

export interface JWTAdminPayload {
  _id: string;
  email: string;
  role: UserRole;
}

export interface JWTObserverPayload {
  _id: string;
  email: string;
  region: RegionsValues;
  role: UserRole;
}

export type CreateToken<
  TJwt extends JWTAdminPayload | JWTUserPayload | JWTObserverPayload,
> = (payload: TJwt) => string;

export interface LoginResponse<TServiceResponse> {
  token: string;
  user: TServiceResponse;
}

export interface AuthResponse<TServiceResponse> {
  user: TServiceResponse;
}

export interface UserResponse {
  _id: string;
  region: RegionsValues;
  badgeNumber: string;
  brigadeNumber: string;
  email: string;
  fullName: string;
  role: UserRole;
}

export interface AdminResponse {
  _id: string;
  email: string;
  role: UserRole;
}

export interface ObserverResponse {
  _id: string;
  role: UserRole;
  email: string;
  region: RegionsValues;
}
