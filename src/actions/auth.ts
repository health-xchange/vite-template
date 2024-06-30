import { AxiosResponse } from 'axios';
import { RegisterUser, SignInResponse, SignInUser } from '@/interfaces/common';
import { apiClient, setReqHeader } from '@/state/axios-interceptors';

interface GoogleUser {
  email: string;
  name: string;
  iss: string;
}

export const getGoogleUser = async (authToken: string) =>
  apiClient<GoogleUser>({
    method: 'POST',
    url: '/auth/validate/google',
    data: { authToken },
  })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => {
      throw error;
    });

export const registerUser = async (user: RegisterUser) =>
  apiClient({
    method: 'POST',
    url: '/auth/register',
    data: user,
  })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => {
      throw error;
    });

export const signInUser = async (userData: SignInUser) =>
  apiClient({
    method: 'POST',
    url: '/auth/login',
    data: userData,
  })
    .then((responseData: AxiosResponse<SignInResponse, any>) => {
      const { authToken } = responseData.data;
      setReqHeader('Authorization', authToken);
      return Promise.resolve(responseData.data);
    })
    .catch((error: any) => {
      throw error;
    });

export const verifyUserEmail = async (email: string, token: string) =>
  apiClient({
    method: 'POST',
    url: '/auth/verify',
    data: { email, token },
  });

export const sendForgotPassword = async (email: string) =>
  apiClient({
    method: 'POST',
    url: '/auth/forgot',
    data: { email },
  });

export const sendNewPassword = async (
  referenceId: string,
  otpToken: string,
  password: string,
  confirmPassword: string
) =>
  apiClient({
    method: 'POST',
    url: '/auth/reset_password',
    data: {
      referenceId,
      otpToken,
      password,
      confirmPassword,
    },
  });
