export const API_ENDPOINTS = {
  GET_CLAIMS: '/claims',
  GET_CLAIM: '/claims/:claimId',
  CREATE_NEW_CLAIM: '/claims/:claimId',
  UPDATE_CLAIM: '/claims/:claimId',
  DELETE_CLAIM: '/claims/:claimId',

  GET_CLAIM_TRANSACTIONS: '/claims/:claimId/trans',
  NEW_TRANSACTION: '/claims/:claimId/trans',
  REFRESH_TRANSACTION_STATUS: '/claims/:claimId/trans/:transId/refresh',
  UPDATE_TRANSACTION: '/claims/:claimId/trans/:transId',
  DELETE_TRANSACTION: '/claims/:claimId/trans/:transId',
};
