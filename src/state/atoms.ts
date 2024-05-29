import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LoginState } from '@/interfaces/common';
import { Claim } from '@/interfaces/claims';
import { claimsList as mockClaims } from './mock-claims-data';

const { persistAtom } = recoilPersist();

export const defaultAuthState: LoginState = { isLoggedIn: false, userInfo: null };
export const atomAuthState = atom<LoginState>({
  key: 'blue-ai-auth',
  default: defaultAuthState,
  effects_UNSTABLE: [persistAtom],
});

export const atomClaimsList = atom<Claim[]>({
  key: 'claims-list',
  default: mockClaims,
  effects_UNSTABLE: [persistAtom],
});

export const getClaimById = selector({
  key: 'getClaimById',
  get: ({ get }) => {
    const claimList = get(atomClaimsList);
    return (claimId: string) => claimList.find((claim) => claim.id === claimId);
  },
});
