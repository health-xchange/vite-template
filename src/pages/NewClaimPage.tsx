import { Center, Loader, Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import NewClaimForm from '@/components/NewClaimForm/NewClaimForm';
import { useClaim } from '@/hooks/useClaim';
import ClaimLayout from '@/Layouts/ClaimLayout';

export default function NewClaimPage() {
  const { claimId } = useParams();
  const { isLoading, claim, updateClaim } = useClaim(claimId);

  return (
    <div>
      <ClaimLayout activeBullet={0}>
        {isLoading ? (
          <Center>
            <Stack justify="center" align="center">
              <Loader color="blue" />
              <Text>Loading Claim details...</Text>
            </Stack>
          </Center>
        ) : (
          !!claim && !!updateClaim && <NewClaimForm claim={claim} updateClaim={updateClaim} />
        )}
      </ClaimLayout>
    </div>
  );
}
