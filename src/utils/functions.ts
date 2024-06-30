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
    case 'draft':
      return { value: 1 / 7, label: 'Draft' };
    case 'waiting_for_payment':
      return { value: 2 / 7, label: 'Payment Pending' };
    case 'waiting_for_additional_info':
      return { value: 3 / 7, label: 'Waiting for Critical Info' };
    case 'waiting_for_reviewer_response':
      return { value: 4 / 7, label: 'Reviewing' };
    case 'reviewing':
      return { value: 5 / 7, label: 'Review' };
    case 'waiting_for_user_response':
      return { value: 6 / 7, label: 'Waiting on your response' };
    case 'success':
      return { value: 7 / 7, label: 'Success' };
    case 'failed':
      return { value: 7 / 7, label: 'Failed' };
  }
};
