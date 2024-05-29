import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
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

export const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await apiClient.post('/auth/token', { refreshToken });
    if ((response.status = 201)) {
      return await Promise.resolve(response.data.authToken);
    }
    return await Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && originalRequest?.url === '/auth/token') {
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
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

export default apiClient;
