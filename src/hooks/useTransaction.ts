import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createNewTransactionAction, getTransaction } from '@/actions/claims';
import { useClaim } from './useClaim';
import { Transaction } from '@/interfaces/claims';

export const useTransaction = () => {
  const { claimId = '' } = useParams();
  const { claimDetails } = useClaim();
  const [transaction, setTransaction] = useState<Transaction>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewTransaction, setIsNewTransaction] = useState(false);

  const createNewTransaction = () => {
    createNewTransactionAction(claimId)
      .then((newTrans) => {
        setIsNewTransaction(true);
        setTransaction(newTrans);
      })
      .catch(() => setTransaction(undefined))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    if (claimDetails.data) {
      if (!claimDetails.data?.transactionId && !isNewTransaction) {
        setIsNewTransaction(true);
        createNewTransaction();
      } else if (claimDetails.data.transactionId) {
        getTransaction(claimId, claimDetails.data?.transactionId)
          .then((oldTrans) => {
            setTransaction(oldTrans);
          })
          .catch(() => {
            setTransaction(undefined);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [claimDetails.data]);

  return {
    transaction: transaction,
    isLoading,
    isNewTransaction,
    createNewTransaction,
  };
};
