import { Center, Loader, Stack, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
// import { useClaim } from '@/hooks/useClaim';
import AdditionalInfoForm from '@/components/AdditionalInfoForm/AdditionalInfoForm';
import ClaimLayout from '@/Layouts/ClaimLayout';
import { useQuery } from 'react-query';
import { useClaim } from '@/hooks/useClaim';

export default function AdditionalInfoPage() {
  const { claimId } = useParams();
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
          !!claimDetails.data &&
          !!updateClaim && (
            <AdditionalInfoForm claim={claimDetails.data} updateClaim={updateClaim} />
          )
        )}
      </ClaimLayout>
    </div>
  );
}
