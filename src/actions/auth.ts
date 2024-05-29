import axios from 'axios';
import { RegisterUser, SignInResponse, SignInUser } from '@/interfaces/common';
import { apiClient, setReqHeader } from '@/utils/axiosClient';

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
    .then((responseData) => {
      const { user, refreshToken, authToken } = responseData.data as SignInResponse;
      setReqHeader('Authorization', authToken);
      return Promise.resolve({ user, refreshToken });
    })
    .catch((error) => {
      throw error;
    });

export const verifyUserEmail = async (email: string, token: string) => apiClient({
    method: 'POST',
    url: '/auth/verify',
    data: { email, token },
  });

// export const signOutUser = async (userData: SignOutUser) => {

// }
