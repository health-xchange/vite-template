import { PaperProps } from '@mantine/core';
import { Claim } from './claims';

export type AuthenticationPagesProps = PaperProps & { authType: AuthTypes };

export type AuthTypes = '/confirm/:email/:token' | '/login' | '/register';

export interface RegisterUser extends SignInUser {
  username: string;
  terms: boolean;
  iss?: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  userInfo: null | {
    username: string;
    email: string;
    _id: string;
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
  username: string;
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
  updateClaim: (updateClaim: Claim) => void;
}
