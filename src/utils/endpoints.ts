export const API_ENDPOINTS = {
  GET_CLAIMS: '/claims',
  GET_CLAIM: '/claims/:claimId',
  CREATE_NEW_CLAIM: '/claims/:claimId',
  UPDATE_CLAIM: '/claims/:claimId',
  DELETE_CLAIM: '/claims/:claimId',

  NEW_TRANSACTION: '/claims/:claimId/trans',
  // GET_RECENT_TRANSACTION: '/claims/:claimId/recent_trans',
  GET_CLAIM_TRANSACTION: '/claims/:claimId/trans',
  REFRESH_TRANSACTION_STATUS: '/claims/:claimId/trans/:transId/refresh',
  GET_TRANSACTION: '/claims/:claimId/trans/:transId',
  UPDATE_TRANSACTION: '/claims/:claimId/trans/:transId',
  DELETE_TRANSACTION: '/claims/:claimId/trans/:transId',
};
