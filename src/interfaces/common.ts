// import { PaperProps } from '@mantine/core';
import { Claim } from './claims';

// export type AuthenticationPagesProps = PaperProps & { authType?: AuthTypes };

// export type AuthTypes = '/verify/:email/:token' | '/login' | '/register';

export interface RegisterUser extends SignInUser {
  firstName: string;
  lastName: string;
  confirmPassword: string;
  terms: boolean;
  iss?: string;
}

export interface SignInUser {
  email?: string;
  password?: string;
  authToken?: string;
  iss?: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  userInfo: null | {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
    refreshToken: string;
  };
}

export interface UserDataType {
  avatar: string;
  name: string;
  job: string;
  email: string;
  phone: string;
}

export interface UserInfoState {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  image?: string;
}

export interface SignInResponse {
  refreshToken: string;
  authToken: string;
  user: UserInfoState;
}

export interface NewFormProps {
  claim: Claim;
  updateClaim: (Params: { claimDetails: Claim; notifyUser: boolean }) => Promise<Claim>;
}

export enum SaveState {
  saving,
  saved,
  unsaved,
}

export interface ApiError {
  message: string;
  data?: any;
  error?: any;
}

export interface TocOptions {
  label: string;
  link: string;
  order: number;
  content: string;
}
