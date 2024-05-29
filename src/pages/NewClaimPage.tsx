import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { PageTitle } from '@/components/PageTitle/PageTitle';
// import CheckoutButton from '@/components/Stripe/CheckoutButton';
import NewClaimForm from '@/components/NewClaimForm/NewClaimForm';
import { getClaimById } from '@/state/atoms';

export default function NewClaimPage() {
  const { claimId = 'new' } = useParams();
  const claim = useRecoilValue(getClaimById)(('new' || ''));

  return (
    <div>
      <Container size="md">
        <PageTitle title="New Claim" />
        {/* <CheckoutButton /> */}
        <NewClaimForm claimDetails={claim?.details} />
      </Container>
    </div>
  );
}
