import { refreshPaymentStatus } from '@/actions/claims';
import { Container, Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

interface PaymentStatusProps {
  paymentStatus: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ paymentStatus }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (paymentStatus) {
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
  }, [paymentStatus]);

  return (
    <Container>
      <Group>
        <Text>Your payment status is: {message}</Text>
        <Text>
          We will carefully study your claim detials and get back to you with more suggestions on
          processing a successful claim
        </Text>
      </Group>
    </Container>
  );
};

const PaymentConfirmation: React.FC<{}> = () => {
  const { claimId, transactionId } = useParams();
  const [searchParams] = useSearchParams();
  const payment_intent = searchParams.get('payment_intent');
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
  const redirect_status = searchParams.get('redirect_status');
  const [paymentStatus, setPaymentStatus] = useState('');

  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    return <Text>Invalid payment details. You will be redirected to Claims page.</Text>;
  }

  useEffect(() => {
    if (claimId && transactionId) {
      refreshPaymentStatus(claimId, transactionId)
        .then(setPaymentStatus)
        .catch((error) => {
          console.error(error);
        });
    }
  }, [claimId, transactionId]);

  return <PaymentStatus paymentStatus={paymentStatus} />;
};

export default PaymentConfirmation;
