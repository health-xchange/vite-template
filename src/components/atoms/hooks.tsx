import { useEffect, useState } from 'react';
import { defaultAuthState } from './atoms';

export function useLogin() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useState(defaultAuthState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultAuthState : value, setValue] as const;
}
