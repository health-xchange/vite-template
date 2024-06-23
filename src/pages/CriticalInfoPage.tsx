import { Center, Loader, Stack, Text } from '@mantine/core';
import ClaimLayout from '@/Layouts/ClaimLayout';
import { useClaim } from '@/hooks/useClaim';
import CriticalInfoForm from '@/components/CriticalInfoForm/CriticalInfoForm';

export default function CriticalInfoPage() {
  const { claimDetails, updateClaim } = useClaim();

  return (
    <div>
      <ClaimLayout activeBullet={2}>
        {claimDetails.isLoading ? (
          <Center>
            <Stack justify="center" align="center">
              <Loader color="blue" />
              <Text>Loading Claim details...</Text>
            </Stack>
          </Center>
        ) : (
          !!claimDetails.data && (
            <CriticalInfoForm claim={claimDetails.data} updateClaim={updateClaim} />
          )
        )}
      </ClaimLayout>
    </div>
  );
}
