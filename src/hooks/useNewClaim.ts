import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { atomClaimsList } from '@/state/atoms';
import { Claim } from '@/interfaces/claims';
import { paths } from '@/Router';
import { sanitise, uniqSm } from '@/utils/functions';
import { useLogin } from '@/state/hooks';
import { createNewClaimAction } from '@/actions/claims';

const useNewClaim = () => {
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);
  const navigate = useNavigate();
  const { userInfo } = useLogin();

  const createNewClaim = useCallback(() => {
    const newClaim: Claim = {
      _id: uniqSm(8),
      status: 'draft',
      userId: userInfo?._id || '',
      details: {
        _id: uniqSm(8),
        userId: userInfo?._id || '',
        first_name: '',
        last_name: '',
        state: '',
        is_not_cosmetic_claim: undefined,
        insurance_type: '',
        insurance_provider: '',
        date_of_claim_denial: new Date().toISOString(),
        claim_amount: '',
        reason_for_claim_denial: '',
        oon_emergency_service: '',
        oon_is_in_network_service: '',
        oon_is_signed_consent: '',
        consent_opt1: undefined,
        consent_opt2: undefined,
        consent_opt3: undefined,
        consent_opt4: undefined,
      },
    };
    createNewClaimAction(newClaim)
      .then((createdClaim: AxiosResponse<Claim, any>) => {
        const newClaimsList = [createdClaim.data, ...claimsList];
        setClaimsList(newClaimsList);
        navigate(sanitise(paths.claimsDetails, { claimId: newClaim._id }));
      })
      .catch(() => {
        toast("New Claim couldn't be created at the moment. Please try again later", {
          type: 'error',
        });
      });
  }, [claimsList]);

  return { createNewClaim };
};

export default useNewClaim;
