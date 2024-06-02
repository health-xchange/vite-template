import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Claim, ClaimStatus, ClaimsListResponse } from '@/interfaces/claims';
import { atomClaimsList } from '@/state/atoms';
import { fetchClaimsList, updateClaimAction } from '@/actions/claims';
import { paths } from '@/Router';

export const useClaim = (claimId: string | undefined) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | undefined>(undefined);
  const [isFetching, setIsfetching] = useState(false);
  const navigate = useNavigate();
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);

  const updateClaim = useCallback(
    (updatedClaim: Claim, status: ClaimStatus = 'draft') => {
      updateClaimAction({ ...updatedClaim, status })
        .then(() => {
          const updatedClaimsList = claimsList.map((item: Claim) =>
            item._id === updatedClaim._id ? updatedClaim : item
          );
          setClaimsList(updatedClaimsList);
          setSelectedClaim(updatedClaim);
        })
        .catch(() => {
          throw new Error('Failed to update a claim');
        });
    },
    [claimsList]
  );

  const getSelectedClaim = useCallback(() => {
    if (!claimId) navigate(paths.claimsList);
    let claim = claimsList.find((item) => item._id === claimId);
    if (claim) {
      setSelectedClaim({ ...claim });
    } else {
      toast
        .promise(fetchClaimsList(), {
          pending: {
            render: () => {
              setIsfetching(true);
              return 'Please wait while we check the claim detials';
            },
          },
          error: 'Could not find the claim detials',
        })
        .then((response) => {
          const { claims: remoteClaims } = response.data as ClaimsListResponse;
          claim = remoteClaims.find((item) => item._id === claimId);
          if (!claim) {
            toast.error('Could not find the claim details.');
            navigate(paths.claimsList);
          } else {
            setClaimsList(remoteClaims);
            setSelectedClaim({ ...claim });
          }
        })
        .catch(() => navigate(paths.claimsList, { replace: true }))
        .finally(() => setIsfetching(false));
    }
  }, [claimId]);

  useEffect(() => {
    getSelectedClaim();
  }, [claimId]);

  return { claim: selectedClaim, updateClaim, isLoading: isFetching };
};
