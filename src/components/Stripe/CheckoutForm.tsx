import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, StripePaymentElementOptions, loadStripe } from '@stripe/stripe-js';
import { Button, Text, Modal } from '@mantine/core';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentModalProps {
  claimId: string;
  isModalOpen: boolean;
  closeModal: () => void;
  clientSecret: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isModalOpen, closeModal, claimId, clientSecret }) => {
  const stripe = useStripe();
  // const { claimId } = useParams();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { origin } = window.location;
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/claims/${claimId}/payment-confirmation`,
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

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  const appearance: Appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Modal opened={isModalOpen} onClose={closeModal} title="Payment" centered>
      <Elements options={options} stripe={stripePromise}>
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" options={paymentElementOptions} />
          <Button loading={isLoading} type="submit" disabled={isLoading || !stripe || !elements} id="submit">
            Pay Now
          </Button>
          {message && <Text>{message}</Text>}
        </form>
      </Elements>
    </Modal>
  );
};

export default PaymentModal;
