import { Container, SimpleGrid } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import NewClaimCard from '@/components/NewClaimCard/NewClaimCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import StatsRingCard from '@/components/StatusRingCard/StatusRingCard';
import { atomClaimsList } from '@/state/atoms';
import useNewClaim from '@/hooks/useNewClaim';
import { fetchClaimsList } from '@/actions/claims';
import { Claim } from '@/interfaces/claims';

export default function ClaimsListPage() {
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);
  const { createNewClaim } = useNewClaim();

  useEffect(() => {
    fetchClaimsList()
      .then((response: AxiosResponse<Claim[], any>) => {
        const savedClaims = response.data;
        setClaimsList(savedClaims);
      })
      .catch((error: any) => {
        console.error('Failed to fetch claims list', error);
        toast('Failed to fetch claims', { type: 'error' });
      });
  }, []);

  return (
    <Container size="xl">
      <PageTitle title="Claims" />
      <SimpleGrid cols={{ base: 3, xs: 3 }}>
        <NewClaimCard onClick={createNewClaim} />
        {
          claimsList.map(claim =>
            <StatsRingCard
              key={claim._id}
              _id={claim._id}
              status={claim.status}
              details={claim.details}
            />)
        }
      </SimpleGrid>
    </Container>
  );
}
