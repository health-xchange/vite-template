import { Claim, ClaimTransactionResponse, Transaction, TransactionStatus } from '@/interfaces/claims';
import { apiClient } from '@/state/axios-interceptors';
import { API_ENDPOINTS } from '@/utils/endpoints';
import { sanitise } from '@/utils/functions';

export const createNewClaimAction = async (claim: Claim) => {
  try {
    const response = await apiClient<Claim>({
      method: 'POST',
      url: sanitise(API_ENDPOINTS.CREATE_NEW_CLAIM, { claimId: claim._id }),
      data: claim,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchClaimsList = async () => {
  try {
    const response = await apiClient<Claim[]>({
      method: 'GET',
      url: API_ENDPOINTS.GET_CLAIMS,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchClaimById = async (claimId: string) => {
  try {
    const response = await apiClient<Claim>({
      method: 'GET',
      url: sanitise(API_ENDPOINTS.GET_CLAIM, { claimId }),
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateClaimAction = async (claimDetails: Claim) => {
  try {
    const response = await apiClient<Claim>({
      method: 'PUT',
      url: sanitise(API_ENDPOINTS.UPDATE_CLAIM, { claimId: claimDetails._id }),
      data: claimDetails,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteClaim = (claimId: string) =>
  apiClient({
    method: 'DELETE',
    url: sanitise(API_ENDPOINTS.DELETE_CLAIM, { claimId }),
  });

export const createNewTransactionAction = async (claimId: string) => {
  try {
    const response = await apiClient<Transaction>({
      method: 'POST',
      url: sanitise(API_ENDPOINTS.NEW_TRANSACTION, { claimId }),
      data: {
        amount: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getClaimTransaction = async (claimId: string) => {
  try {
    const response = await apiClient<ClaimTransactionResponse>({
      method: 'GET',
      url: sanitise(API_ENDPOINTS.GET_CLAIM_TRANSACTION, { claimId }),
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getTransaction = async (claimId: string, transId: string) => {
  try {
    const response = await apiClient<Transaction>({
      method: 'GET',
      url: sanitise(API_ENDPOINTS.GET_TRANSACTION, { claimId, transId }),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateClaimAction = async (claim: Claim) => {
//   try {
//     const response = await apiClient<Claim>({
//       method: 'PATCH',
//       url: sanitise(API_ENDPOINTS.UPDATE_CLAIM, { claimId: claim._id }),
//       data: claim,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const refreshPaymentStatus = async (claimId: string, transId: string) => {
  try {
    const response = await apiClient<{ status: TransactionStatus }>({
      method: 'GET',
      url: sanitise(API_ENDPOINTS.REFRESH_TRANSACTION_STATUS, { claimId, transId }),
    });
    return response.data.status;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
