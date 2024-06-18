import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Claim } from '@/interfaces/claims';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNewClaimAction, fetchClaimById, updateClaimAction } from '@/actions/claims';
import { sanitise, uniqSm } from '@/utils/functions';
import { useLogin } from '@/state/hooks';
import { paths } from '@/Router';

export const useClaim = () => {
  const { claimId, transactionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = useLogin();

  const claimDetails = useQuery(['getClaim', claimId], () => fetchClaimById(claimId || ''), {
    retry: 1,
    enabled: !!claimId,
    onError: (error) => {
      console.error(error);
    },
  });

  const newClaimMutation = useMutation(createNewClaimAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('claimsList');
    },
    onError: (error: Error) => {
      console.log('Update error:', error);
      toast("New Claim couldn't be created at the moment. Please try again later", {
        type: 'error',
      });
    },
  });

  const updateClaimMutation = useMutation(updateClaimAction, {
    onSuccess: (updatedClaim) => {
      queryClient.invalidateQueries(['getClaim', updatedClaim._id]);
    },
    onError: (error: Error) => {
      toast(`Error while updating claim. ${error.message}`, { type: 'error' });
    },
  });

  const createNewClaim = async () => {
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
        criticalInfo: {
          addl_already_appealed_your_denial: undefined,
          addl_appeal_process: undefined,
          addl_associated_billing_codes: undefined,
          addl_deniel_claim_number: undefined,
          addl_policy_number: undefined,
          addl_relevant_docs: undefined,
          addl_why_should_approve: undefined,
        }
      },
    };
    // return await
    newClaimMutation
      .mutateAsync(newClaim)
      .then((newClaim) => {
        navigate(sanitise(paths.claimsDetails, { claimId: newClaim._id }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (claimId) {
      queryClient.invalidateQueries(['getClaim', claimId]);
    }
  }, [claimId]);

  useEffect(() => {
    if (claimId && transactionId) {
      queryClient.invalidateQueries(['refreshPaymentStatus', claimId, transactionId]);
    }
  }, [claimId, transactionId]);

  return {
    claimDetails: claimDetails,
    createNewClaim,
    updateClaim: updateClaimMutation.mutateAsync,
  };
};
