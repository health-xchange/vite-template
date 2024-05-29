import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LoginState } from '@/interfaces/common';

const { persistAtom } = recoilPersist();

export const defaultAuthState: LoginState = { isLoggedIn: false, userInfo: null };
export const atomAuthState = atom<LoginState>({
  key: 'blue-ai-auth',
  default: defaultAuthState,
  effects_UNSTABLE: [persistAtom],
});
