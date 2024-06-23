import { Container, SimpleGrid } from '@mantine/core';
// import { useRecoilState } from 'recoil';
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { AxiosResponse } from 'axios';
import NewClaimCard from '@/components/NewClaimCard/NewClaimCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import StatsRingCard from '@/components/StatusRingCard/StatusRingCard';
// import { atomClaimsList } from '@/state/atoms';
// import useNewClaim from '@/hooks/useNewClaim';
import { fetchClaimsList } from '@/actions/claims';
import { Claim } from '@/interfaces/claims';
import { useQuery } from 'react-query';
import { useClaim } from '@/hooks/useClaim';

export default function ClaimsListPage() {
  const { data: claimsList, error, isLoading } = useQuery('data', fetchClaimsList);
  const { createNewClaim } = useClaim();

  return (
    <Container size="xl">
      <PageTitle title="Claims" />
      {isLoading ? (
        <div>Loading Claims</div>
      ) : error ? (
        <div>Failed to fetch claims</div>
      ) : (
        <SimpleGrid cols={{ base: 3, xs: 3 }}>
          <NewClaimCard onClick={createNewClaim} />
          {claimsList?.map?.((claim: Claim) => (
            <StatsRingCard 
              key={claim._id}
              claim={claim}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
