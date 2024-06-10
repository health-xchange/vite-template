import { Center, Loader, Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useClaim } from '@/hooks/useClaim';
import AdditionalInfoForm from '@/components/AdditionalInfoForm/AdditionalInfoForm';
import ClaimLayout from '@/Layouts/ClaimLayout';

export default function AdditionalInfoPage() {
  const { claimId } = useParams();
  const { isLoading, claim, updateClaim } = useClaim(claimId);

  return (
    <div>
      <ClaimLayout activeBullet={2}>
        {isLoading ? (
          <Center>
            <Stack justify="center" align="center">
              <Loader color="blue" />
              <Text>Loading Claim details...</Text>
            </Stack>
          </Center>
        ) : (
          !!claim && !!updateClaim && <AdditionalInfoForm claim={claim} updateClaim={updateClaim} />
        )}
      </ClaimLayout>
    </div>
  );
}
