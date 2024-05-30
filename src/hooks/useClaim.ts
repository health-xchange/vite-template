import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Claim, ClaimsListResponse } from '@/interfaces/claims';
import { atomClaimsList } from '@/state/atoms';
import { fetchClaimsList } from '@/actions/claims';
import { paths } from '@/Router';

export const useClaim = (claimId: string | undefined) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | undefined>(undefined);
  const [isFetching, setIsfetching] = useState(false);
  const navigate = useNavigate();
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);

  const updateClaim = useCallback(
    (updatedClaim: Claim) => {
      console.log(updatedClaim);
      // let updatedClaimsList = JSON.parse(JSON.stringify(claimsList));
      const updatedClaimsList = claimsList.map((item: Claim) =>
        item.id === updatedClaim.id ? updatedClaim : item
      );
      // // TODO: add server action to update a claim details.
      setClaimsList(updatedClaimsList);
      setSelectedClaim(updatedClaim);
    },
    [claimsList]
  );

  const getSelectedClaim = useCallback(() => {
    if (!claimId) navigate(paths.claimsList);
    let claim = claimsList.find((item) => item.id === claimId);
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
          claim = remoteClaims.find((item) => item.id === claimId);
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
