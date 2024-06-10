import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { refreshPaymentStatus } from '@/actions/claims';
import { TransactionStatus } from '@/interfaces/claims';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import ClaimLayout from '@/Layouts/ClaimLayout';
import { IconArrowLeft, IconArrowRight, IconPencil, IconPencilPlus } from '@tabler/icons-react';
import { paths } from '@/Router';
import { sanitise } from '@/utils/functions';

interface PaymentStatusProps {
  paymentStatus: TransactionStatus;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ paymentStatus }) => {
  const [message, setMessage] = useState('');
  const { claimId } = useParams();
  const theme = useMantineTheme();
  const navigate = useNavigate();

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

  const handleNextStepClick = () => {
    if (claimId) navigate(sanitise(paths.additionalInfo, { claimId }));
  };

  const handlePrevStepClick = () => {
    if (claimId) navigate(sanitise(paths.claimsDetails, { claimId }));
  };

  return (
    <Group>
      <Text>Your payment status is: {message}</Text>
      <Text>
        We will carefully study your claim detials and get back to you with more suggestions on
        processing a successful claim
      </Text>
      <Group w={'100%'} justify="center" my="xl">
        <Button
          onClick={handlePrevStepClick}
          variant="default"
          color={theme.colors.red[6]}
          leftSection={<IconArrowLeft />}
          rightSection={<IconPencil />}
          size="md"
        >
          Update Primary details
        </Button>
        <Button
          onClick={handleNextStepClick}
          variant="filled"
          leftSection={<IconPencilPlus />}
          rightSection={<IconArrowRight />}
          size="md"
        >
          Provide Additional information
        </Button>
      </Group>
    </Group>
  );
};

const PaymentConfirmation: React.FC<{}> = () => {
  const { claimId, transactionId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (claimId && transactionId) {
      refreshPaymentStatus(claimId, transactionId)
        .then(setPaymentStatus)
        .catch((error) => {
          console.error(error);
        });
    }
  }, [claimId, transactionId]);

  return (
    <ClaimLayout activeBullet={1}>
      <PaymentStatus paymentStatus={paymentStatus} />
    </ClaimLayout>
  );
};

export default PaymentConfirmation;
