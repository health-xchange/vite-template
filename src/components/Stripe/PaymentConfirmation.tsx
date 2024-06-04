import { Container, Group, Text } from '@mantine/core';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaymentStatusProps {
  intentId: string;
  client_secret: string;
  redirect_status: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = (props) => {
  const { client_secret } = props;
  const stripe = useStripe();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!client_secret) {
      return;
    }

    stripe.retrievePaymentIntent(client_secret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  return (
    <Container>
      <Group>
        <Text>Your payment status is: {message}</Text>
        <Text>We will carefully study your claim detials
          and get back to you with more suggestions on processing a successful claim
        </Text>
      </Group>
    </Container>
  );
};

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PaymentConfirmation: React.FC<{}> = () => {
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
  const redirect_status = searchParams.get('redirect_status');

  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    return <Text>Invalid payment details. You will be redirected to Claims page.</Text>;
  }

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret: payment_intent_client_secret,
    appearance,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentStatus
        intentId={payment_intent}
        client_secret={payment_intent_client_secret}
        redirect_status={redirect_status}
      />
    </Elements>
  );
};

export default PaymentConfirmation;
