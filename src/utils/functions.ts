import { customAlphabet } from 'nanoid';

export const sanitise = (inpStr: string, inpObj: Record<string, string>): string => {
  Object.keys(inpObj).forEach((key) => {
    inpStr = inpStr.replaceAll(`:${key}`, inpObj[key]);
  });
  return inpStr;
};

export const uniqSm = (length = 8) => customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', length)();
