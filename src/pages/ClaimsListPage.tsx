import { Container, SimpleGrid } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import NewClaimCard from '@/components/NewClaimCard/NewClaimCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import StatsRingCard from '@/components/StatusRingCard/StatusRingCard';
import { atomClaimsList } from '@/state/atoms';
import useNewClaim from '@/hooks/useNewClaim';

export default function ClaimsListPage() {
  const claimsList = useRecoilValue(atomClaimsList);
  const { createNewClaim } = useNewClaim();

  return (
    <Container size="xl">
      <PageTitle title="Claims" />
      <SimpleGrid cols={{ base: 3, xs: 3 }}>
        <NewClaimCard onClick={createNewClaim} />
        {
          claimsList.map(claim =>
            <StatsRingCard
              key={claim.id}
              id={claim.id}
              metadata={claim.metadata}
              details={claim.details}
            />)
        }
      </SimpleGrid>
    </Container>
  );
}
