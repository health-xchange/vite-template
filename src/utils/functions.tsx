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
    case 'draft': return {
      percent: 10,
      label: 'New',
    };
    case 'waiting_for_payment':
      return { percent: 30, label: 'Payment Pending' };
    case 'waiting_for_additional_info':
      return { percent: 50, label: 'Critical Info required' };
    case 'reviewing':
    case 'waiting_for_reviewer_response':
      return { percent: 100, label: 'Reviewing' };
    case 'waiting_for_user_response':
      return { percent: 100, label: 'Waiting your response' };
    case 'success':
      return { percent: 100, label: 'Closed successfully' };
    case 'failed':
      return { percent: 100, label: 'Claim failed' };
    default: return {
      percent: 10,
      label: 'New',
    };
  }
};
