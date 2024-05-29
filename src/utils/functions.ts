export const sanitise = (inpStr: string, inpObj: Record<string, string>): string => {
  Object.keys(inpObj).forEach(key => {
    inpStr = inpStr.replaceAll(`:${key}`, inpObj[key]);
  });
  return inpStr;
};
