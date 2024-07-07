import { Center, Loader, Stack, Text } from '@mantine/core';
import NewClaimForm from '@/components/NewClaimForm/NewClaimForm';
import ClaimLayout from '@/Layouts/ClaimLayout';
import { useClaim } from '@/hooks/useClaim';

export default function NewClaimPage() {
  const { claimDetails } = useClaim();
  return (
    <div>
      <ClaimLayout activeBullet={0}>
        {claimDetails.isLoading ? (
          <Center>
            <Stack justify="center" align="center">
              <Loader color="blue" />
              <Text>Loading Claim details...</Text>
            </Stack>
          </Center>
        ) : (
          !claimDetails.error &&
          claimDetails.data && <NewClaimForm />
        )}
      </ClaimLayout>
    </div>
  );
}
