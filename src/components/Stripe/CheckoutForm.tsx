import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Button, Text, useMantineTheme, Stack } from '@mantine/core';
import { paths } from '@/Router';
import { sanitise } from '@/utils/functions';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PaymentForm: React.FC<{ claimId: string; transactionId: string }> = ({
  claimId,
  transactionId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { origin } = window.location;
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const redirectPath = sanitise(paths.claimPaymentConfirmation, { claimId, transactionId });
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}${redirectPath}`, // http://localhost:3000/api/claims/:claimId/:transactionId
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || '');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: 'auto' }} />
      <Stack justify="center">
        <Button
          mt={30}
          loading={isLoading}
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          Pay & Submit
        </Button>
        <Text fw="bold" color={theme.colors.red[8]}>
          {message}
        </Text>
      </Stack>
    </form>
  );
};

interface PaymentModalProps {
  claimId: string;
  transactionId: string;
  clientSecret: string;
}

const PaymentSection: React.FC<PaymentModalProps> = ({
  claimId,
  transactionId,
  clientSecret,
}) => {
  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm claimId={claimId} transactionId={transactionId} />
    </Elements>
  );
};

export default PaymentSection;
