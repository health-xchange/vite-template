import apiClient from '@/utils/axiosClient';

export const fetchClaimsList = () =>
  apiClient({
    method: 'GET',
    url: '/api/claims',
  });

export const deleteClaim = (claimId: string) =>
  apiClient({
    method: 'DELETE',
    url: `/claim/${claimId}`,
  });
