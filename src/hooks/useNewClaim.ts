import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Claim } from '@/interfaces/claims';
import { paths } from '@/Router';
import { sanitise, uniqSm } from '@/utils/functions';
import { useLogin } from '@/state/hooks';
import {
  createNewClaimAction,
  updateAndGetPaymentAction
} from '@/actions/claims';
import { useMutation, useQueryClient } from 'react-query';

const useNewClaim = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = useLogin();

  const newClaimMutation = useMutation(createNewClaimAction, {
    onSuccess: (claim) => {
      queryClient.invalidateQueries('claimsList');
      navigate(sanitise(paths.claimsDetails, { claimId: claim._id }));
    },
    onError: (error: Error) => {
      console.log('Update error:', error);
      toast("New Claim couldn't be created at the moment. Please try again later", {
        type: 'error',
      });
    },
  });

  const updateClaimMutation = useMutation(updateAndGetPaymentAction, {
    onSuccess: (newTransaction) => {
      queryClient.invalidateQueries(['getClaim', newTransaction.claimId]);
      navigate(
        sanitise(paths.claimPaymentConfirmation, {
          claimId: newTransaction.claimId,
          transactionId: newTransaction.transactionId,
        })
      );
    },
    onError: (error: Error) => {
      toast(`Error while updating claim. ${error.message}`, { type: 'error' });
    },
  });

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
    newClaimMutation.mutate(newClaim);
  }, []);

  return { createNewClaim, updateClaim: updateClaimMutation };
};

export default useNewClaim;
