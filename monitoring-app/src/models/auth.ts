import { IUser } from './user';

export enum AuthLoading {
  LOADING_AUTH="LOADING_AUTH",
  LOADING_TOKEN_AUTH="LOADING_TOKEN_AUTH",
  NONE="NONE",
}


export interface UserResponse {
  user: IUser;
  token: string;
}

export type AuthResponse = Omit<UserResponse, 'token'>;
