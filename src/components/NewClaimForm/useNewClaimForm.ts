import { paths } from '@/Router';
import { useClaim } from '@/hooks/useClaim';
import { Claim } from '@/interfaces/claims';
import { getEnvVars, sanitise } from '@/utils/functions';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let { VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM } = getEnvVars();
VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM = Number(VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM);

const useNewClaimForm = () => {
  const { claimDetails, updateClaim } = useClaim();
  const [isFormSaving, setIsFormSaving] = useState(false);
  const claim = claimDetails.data as Claim;
  const navigate = useNavigate();
  if (!claim.details) {
    toast('Claim not found', { type: 'error', toastId: 'claim-not-found' });
    navigate(paths.claimsList);
  }

  const dateOfClaimDenial = moment(claim?.details?.date_of_claim_denial).isValid()
    ? moment(claim?.details?.date_of_claim_denial)
    : undefined;

  const form = useForm({
    mode: 'controlled',
    initialValues: { ...claim?.details, date_of_claim_denial: dateOfClaimDenial },
    validate: (values) => ({
      first_name:
        (values?.first_name?.trim?.()?.length || 0) < 3
          ? 'First name must include at least 3 characters'
          : null,
      last_name: (values.last_name?.trim?.()?.length || 0) < 1 ? 'Last name is required' : null,
      date_of_claim_denial:
        moment().startOf('day').diff(moment(values.date_of_claim_denial), 'days') > 10
          ? `Your claim was denied was on more than ${VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM} days. we cannot deal with it now.`
          : null,
    }),
  });

  const isNotCosmeticClaim = useMemo(
    () => form.values.is_not_cosmetic_claim ?? false,
    [form.values]
  );

  const handleSaveAndPayClick = async () => {
    setIsFormSaving(true);
    if (form.validate().hasErrors) {
      setIsFormSaving(false);
      return false;
    }
    updateClaim({
      claimDetails: {
        ...claim,
        details: {
          ...form.values,
          date_of_claim_denial: form.values.date_of_claim_denial?.toISOString(),
        },
        status: claim.status === 'draft' ? 'waiting_for_payment' : claim.status,
        notifyUser: false,
      },
      notifyUser: false,
    })
    .then((claim) => {
      navigate(sanitise(paths.claimPayment, { claimId: claim._id }));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsFormSaving(true);
    });
  };

  return {
    maxAllowedDays: VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM,
    claimForm: form,
    isNotCosmeticClaim,
    handleSaveAndNextClick: handleSaveAndPayClick,
    isFormSaving,
  };
};

export default useNewClaimForm;
