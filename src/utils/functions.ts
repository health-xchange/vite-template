import { AuthTypes } from '@/interfaces/common';
import { customAlphabet } from 'nanoid';

interface ParsedObject {
  [key: string]: string | number | boolean;
}

export const getEnvVars = () => {
  return import.meta.env;
  // const obj = import.meta.env;
  // return Object.keys(obj).reduce((cum: ParsedObject, cur: string) => {
  //   try {
  //     cum[cur] = JSON.parse(obj[cur]);
  //   } catch (error) {
  //     cum[cur] = obj[cur];
  //   }
  //   return cum;
  // }, {} as ParsedObject);
};

export const sanitise = (inpStr: string, inpObj: Record<string, string>): string => {
  Object.keys(inpObj).forEach((key) => {
    inpStr = inpStr.replaceAll(`:${key}`, inpObj[key]);
  });
  return inpStr;
};

export const uniqSm = (length = 8) =>
  customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', length)();

export const getAuthTypeLabel = (authType: AuthTypes): string => {
  switch (authType) {
    case '/login':
      return 'Login';
    case '/register':
      return 'Register';
    case '/verify/:email/:token':
      return 'Login';
  }
};
