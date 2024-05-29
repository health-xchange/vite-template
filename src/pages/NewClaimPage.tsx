import { Container } from '@mantine/core';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import CheckoutButton from '@/components/Stripe/CheckoutButton';
import NewClaimForm from '@/components/NewClaimForm/NewClaimForm';

export default function NewClaimPage() {
  return (
    <div>
      <Container size="md">
        <PageTitle title="New Claim" />
        <CheckoutButton />
        <NewClaimForm />
      </Container>
    </div>
  );
}
