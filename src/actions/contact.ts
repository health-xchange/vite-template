import { apiClient } from '@/state/axios-interceptors';

interface QueryResponse {
  message: string;
  data: any;
}

export const sendContactQuery = async (email: string, name: string, message: string) =>
  apiClient<QueryResponse>({
    method: 'POST',
    url: '/contact',
    data: { email, name, message },
  })
    .then((response) => Promise.resolve(response.data))
    .catch((error) => {
      throw error;
    });
