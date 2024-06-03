import { Container, Group, Text } from '@mantine/core';
import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const PaymentConfirmation: React.FC<{}> = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
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

export default PaymentConfirmation;
