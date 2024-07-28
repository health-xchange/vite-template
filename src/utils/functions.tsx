import { customAlphabet } from 'nanoid';
import { ClaimStatus } from '@/interfaces/claims';
// import { AuthTypes } from '@/interfaces/common';

export const getEnvVars = () => import.meta.env;

export const sanitise = (inpStr: string, inpObj: Record<string, string>): string => {
  Object.keys(inpObj).forEach((key) => {
    inpStr = inpStr.replaceAll(`:${key}`, inpObj[key]);
  });
  return inpStr;
};

export const uniqSm = (length = 8) =>
  customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', length)();

// export const getAuthTypeLabel = (authType: AuthTypes): string => {
//   switch (authType) {
//     case '/login':
//       return 'Login';
//     case '/register':
//       return 'Register';
//     case '/verify/:email/:token':
//       return 'Login';
//   }
// };

export const getClaimStatus = (status: ClaimStatus) => {
  switch (status) {
    case 'draft': return 'New';
    case 'waiting_for_payment':
      return 'Payment Pending';
    case 'waiting_for_additional_info':
      return 'Waiting for Critical Info';
    case 'waiting_for_reviewer_response':
      return 'Reviewing';
    // case 'reviewing':
    //   return 'Review';
    // case 'waiting_for_user_response':
    //   return 'Waiting on your response';
    // case 'success':
    //   return 'Success';
    // case 'failed':
    //   return 'Failed';
    default: return '';
  }
};
