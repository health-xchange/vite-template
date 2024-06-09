import { AxiosResponse } from 'axios';
import { Claim, NewTransactionResponse } from '@/interfaces/claims';
import { apiClient } from '@/state/axios-interceptors';
import { API_ENDPOINTS } from '@/utils/endpoints';
import { sanitise } from '@/utils/functions';

export const fetchClaimsList = () =>
  apiClient({
    method: 'GET',
    url: API_ENDPOINTS.GET_CLAIMS,
  });

export const createNewClaimAction = (claim: Claim) =>
  apiClient({
    method: 'POST',
    url: sanitise(API_ENDPOINTS.CREATE_NEW_CLAIM, { claimId: claim._id }),
    data: claim,
  })
    .then((newClaim) => newClaim)
    .catch((error) => {
      console.log(error);
      throw error;
    });

export const updateClaimAction = (claim: Claim) =>
  apiClient({
    method: 'PATCH',
    url: sanitise(API_ENDPOINTS.UPDATE_CLAIM, { claimId: claim._id }),
    data: claim,
  })
    .then((updatedClaim) => Promise.resolve(updatedClaim))
    .catch((error) => {
      throw error;
    });

export const deleteClaim = (claimId: string) =>
  apiClient({
    method: 'DELETE',
    url: sanitise(API_ENDPOINTS.DELETE_CLAIM, { claimId }),
  });

export const createNewPaymentIntent = (claimId: string, claimDetails: Claim) =>
  apiClient({
    method: 'POST',
    url: sanitise(API_ENDPOINTS.NEW_TRANSACTION, { claimId }),
    data: {
      amount: 10,
      claimDetails,
    },
  })
  .then((response: AxiosResponse<NewTransactionResponse, any>) => response.data)
  .catch(error => {
    console.error(error);
    throw error;
  });


export const refreshPaymentStatus = (claimId: string, transId: string) => {
  return apiClient({
    method: 'GET',
    url: sanitise(API_ENDPOINTS.REFRESH_TRANSACTION_STATUS, { claimId, transId })
  })
  .then((response: AxiosResponse<{status: string}, any>) => {
    return Promise.resolve(response.data.status);
  })
  .catch(error => {
    console.error(error);
    throw error;
  })
}