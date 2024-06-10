import axios from 'axios';
import { paths } from '@/Router';

// interface ApiContextProps {
//   apiClient: AxiosInstance,
//   setReqHeader?: (req: any, res: any) => void
// }

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setReqHeader = (key: string, val: string) => {
  apiClient.defaults.headers.common[key] = `Bearer ${val}`;
};

export const removeReqHeader = (key: string) => {
  apiClient.defaults.headers.common[key] = '';
};

const getNewAccessToken = async () => {
  const atomsDataStr = localStorage.getItem('recoil-persist');
  if (atomsDataStr) {
    const atomsDataObj = JSON.parse(atomsDataStr);
    const userObj = atomsDataObj['blue-ai-auth'];
    const {
      userInfo: { refreshToken },
    } = userObj || { userInfo: {} };
    if (!userObj || !refreshToken) {
      return window.location.replace(paths.signIn);
    }
    try {
      const response = await apiClient.post('/auth/token', { refreshToken });
      // eslint-disable-next-line no-constant-condition
      if ((response.status = 201)) {
        return await Promise.resolve(response.data.authToken);
      }
      return await Promise.reject();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    console.log('interceptor: ', error);
    if (error?.response?.status === 401 && originalRequest?.url === paths.api_newToken) {
      console.log('interceptor: navigating to signin.');
      window.location.replace(paths.signIn);
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('interceptor: retrying.');
      originalRequest._retry = true;
      return getNewAccessToken().then((authToken) => {
        setReqHeader('Authorization', authToken);
        originalRequest.headers.Authorization = `Bearer ${authToken}`;
        return apiClient(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
