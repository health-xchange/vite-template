import { RegisterUser, SignInUser } from '@/interfaces/common';
import { apiClient, setReqHeader } from '@/utils/axiosClient';

export const registerUser = async (user: RegisterUser) => apiClient({
    method: 'POST',
    url: '/auth/register',
    data: user,
  })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => {
      console.error('Error during registration: ', error);
      throw error;
    });

export const signInUser = async (userData: SignInUser) => apiClient({
    method: 'POST',
    url: '/auth/login',
    data: userData,
  })
    .then((responseData) => {
      const { user, refreshToken, authToken } = responseData.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('refreshToken', refreshToken);
      setReqHeader('Authorization', authToken);
      return Promise.resolve(user);
    })
    .catch((error) => {
      console.error('Error during signin: ', error);
      throw error;
    });
