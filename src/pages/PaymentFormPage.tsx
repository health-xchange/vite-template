import PaymentForm from '@/components/Stripe/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const PaymentFormPage: React.FC<{}> = () => {
  const { claimId } = useParams();

  const appearance: Appearance = {
    theme: 'stripe',
  };

  const options: StripeElementsOptions = {
    appearance,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm claimId={claimId} transactionId={transactionId} />
    </Elements>
  );
};

export default PaymentFormPage;
