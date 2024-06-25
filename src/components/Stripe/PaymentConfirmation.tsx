import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Transaction } from '@/interfaces/claims';
import { Button, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import ClaimLayout from '@/Layouts/ClaimLayout';
import { IconPaywall, IconCreditCardOff, IconArrowLeft, IconArrowRight, IconPencil, IconPencilPlus } from '@tabler/icons-react';
import { paths } from '@/Router';
import { sanitise } from '@/utils/functions';
import { useTransaction } from '@/hooks/useTransaction';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';

interface PaymentStatusProps {
  transaction: Transaction;
  createNewTransaction: () => void;
  isLoading: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ transaction, createNewTransaction, isLoading }) => {
  const [message, setMessage] = useState('');
  const { claimId } = useParams();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  useEffect(() => {
    switch (transaction.status) {
      case 'succeeded':
        setMessage('Payment succeeded!');
        break;
      case 'processing':
        setMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        setMessage('Your last payment was not successful, please try again.');
        break;
      default:
        setMessage('Something went wrong.');
        break;
    }
  }, [transaction.status]);

  const handleNextStepClick = () => {
    if (claimId) navigate(sanitise(paths.criticalInfo, { claimId }));
  };

  const handlePrevStepClick = () => {
    if (claimId) navigate(sanitise(paths.claimsDetails, { claimId }));
  };

  return (
    <Group justify='center'>
      <Stack align='center'>
        <IconPaywall size={100} color={transaction.status === 'succeeded' ? 'var(--mantine-color-green-5)' : 'var(--mantine-color-red-5)'} />
        <Text>{message}</Text>
        {
          transaction.status === 'succeeded' ? (
            <>
              <Text c={'var(--mantine-color-gray-5)'} fw={'500'} ta={'center'}>
                We will carefully study your claim detials and get back to you with more suggestions on
                processing a successful claim.
              </Text>
            </>
          ) :
            <Button loading={isLoading} variant='filled' onClick={() => createNewTransaction()}>Retry Payment ${claimAmount}</Button>
        }
      </Stack>
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
        {
          <Button
            onClick={handleNextStepClick}
            variant="filled"
            disabled={transaction.status !== 'succeeded'}
            leftSection={<IconPencilPlus />}
            rightSection={<IconArrowRight />}
            size="md"
          >
            Provide Additional information
          </Button>
        }
      </Group>
    </Group>
  );
};


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
const claimAmount = import.meta.env.VITE_CLAIM_PAYMENT_AMOUNT || 25;

const PaymentConfirmation: React.FC<{}> = () => {
  const { transaction, isLoading, isNewTransaction, createNewTransaction } = useTransaction();

  const getPaymentUi = () => {
    if (transaction && isNewTransaction) {
      const appearance: Appearance = {
        theme: 'stripe',
      };
      const options: StripeElementsOptions = {
        clientSecret: transaction.transactionDeatils.client_secret,
        appearance,
      };
      return <Elements options={options} stripe={stripePromise}>
        <PaymentForm claimId={transaction.claimId} clientSecret={transaction.transactionDeatils.client_secret}
          transactionId={transaction.transactionDeatils.id} />
      </Elements>
    } else if (transaction) {
      return <PaymentStatus transaction={transaction} isLoading={isLoading} createNewTransaction={createNewTransaction} />
    } else {
      return <Button loading={isLoading} variant='filled' onClick={createNewTransaction}>Pay ${claimAmount}</Button>
    }
  }

  return <ClaimLayout activeBullet={1}>
    {getPaymentUi()}
  </ClaimLayout>
};

export default PaymentConfirmation;
