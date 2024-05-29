import { Container, SimpleGrid } from '@mantine/core';
import NewClaimCard from '@/components/NewClaimCard/NewClaimCard';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import { StatsRingCard } from '@/components/StatusRingCard/StatusRingCard';

export default function ClaimsListPage() {
  return (
      <Container size="xl">
        <PageTitle title="Claims" />
        <SimpleGrid cols={{ base: 3, xs: 3 }}>
          {
            [1, 2, 3, 4, 5].map(n => <StatsRingCard key={n} />)
          }
          <NewClaimCard />
        </SimpleGrid>
      </Container>
  );
}
