import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createNewTransactionAction, refreshPaymentStatus } from '@/actions/claims';

export const useTransaction = () => {
  const { claimId, transactionId } = useParams();
  const [searchParams] = useSearchParams();
  const intent_id = searchParams.get('intentId');
  const client_secret = searchParams.get('client_secret');
  const status = searchParams.get('status');

  const queryClient = useQueryClient();

  const newTransaction = useMutation(createNewTransactionAction);

  const lastTransaction = useQuery('lastTransaction', )

  const transactionStatus = useQuery(
    ['refreshPaymentStatus', claimId, transactionId],
    () => refreshPaymentStatus(claimId || '', transactionId || ''),
    {
      retry: 1,
      enabled: !!claimId && !!transactionId,
      onError: (error: Error) => {
        console.log('Error while getting transaction status', error.message);
        throw error;
      },
    }
  );

  useEffect(() => {
    if (claimId && transactionId) {
      queryClient.invalidateQueries(['refreshPaymentStatus', claimId, transactionId]);
    }
  }, [claimId, transactionId]);

  return {
    transactionStatus,
    claimId,
    transactionId,
    intent_id,
    client_secret,
    status,
    newTransaction,
    createNewTransaction: newTransaction.mutateAsync
  };
};
