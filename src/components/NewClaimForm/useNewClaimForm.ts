import { paths } from '@/Router';
import { useClaim } from '@/hooks/useClaim';
import { Claim } from '@/interfaces/claims';
import { getEnvVars, sanitise } from '@/utils/functions';
import { useForm, yupResolver } from '@mantine/form';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

let { VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM } = getEnvVars();
const maxAllowedDays = Number(VITE_MAX_ALLOWED_DAYS_TO_APPLY_CLAIM);

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
    validate: yupResolver(
      Yup.object().shape({
        first_name: Yup.string()
          .required('First Name is required')
          .min(3, 'First Name should have 3 characters'),
        last_name: Yup.string().required('Last Name is required'),
        state: Yup.string().required('State is required'),
        insurance_type: Yup.string().required('Insurance Type is required'),
        insurance_provider: Yup.string().required('Insurance Provider is required'),
        claim_amount: Yup.string().required('Amount is required'),
        reason_for_claim_denial: Yup.string().required('Please provide the reason for denial'),
        date_of_claim_denial: Yup.string()
          .required('Let us know when your claim was denied')
          .test(
            'min-allowed-days',
            `Your claim was denied was on more than ${maxAllowedDays} days. we cannot deal with it now.`,
            (value) => {
              console.log(value);
              console.log(moment().startOf('day').diff(moment(value), 'days'))
              return moment().startOf('day').diff(moment(value), 'days') < maxAllowedDays;
            }
          ),
      })
    ),
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
