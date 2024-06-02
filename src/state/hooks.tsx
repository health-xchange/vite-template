import { useRecoilState } from 'recoil';
import { atomAuthState } from './atoms';

export function useLogin() {
  const [loginState] = useRecoilState(atomAuthState);
  return {
    isLoggedIn: loginState.isLoggedIn,
    userInfo: loginState.userInfo,
  };
}
