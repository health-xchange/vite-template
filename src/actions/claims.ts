import apiClient from '@/utils/axiosClient';

export const deleteClaim = async (claimId: string) =>
  apiClient({
    method: 'DELETE',
    url: `/claim/${claimId}`,
  });
