import React, { useState } from 'react';
import {
  IconArrowLeft,
  IconCheck,
} from '@tabler/icons-react';
import {
  Button,
  Group,
  TextInput,
  Grid,
  GridCol,
  useCombobox,
  Text,
  Stack,
  Divider,
  Textarea,
  Switch,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { PageTitle } from '../PageTitle/PageTitle';
import { NewFormProps, SaveState } from '@/interfaces/common';
import { sanitise } from '@/utils/functions';
import { paths } from '@/Router';
import { HeroText } from '../StatsCard/HeroText';
import TransitionComp from '@/ReusableComps/TransitionComp';

const CriticalInfoForm: React.FC<NewFormProps> = ({ claim, updateClaim }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState<SaveState>(SaveState.unsaved);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const form = useForm({
    mode: 'controlled',
    initialValues: { ...claim.details.criticalInfo },
    validate: yupResolver(Yup.object().shape({
      addl_already_appealed_your_denial: Yup.boolean(),
      addl_appeal_process: Yup.string()
        .when('addl_already_appealed_your_denial', {
          is: true,
          then: () => Yup.string().required('Please provide the appeal process'),
        }),
      addl_policy_number: Yup.string().required('Policy number is required'),
      addl_deniel_claim_number: Yup.string().required('Claim number is required'),
      addl_why_should_approve: Yup.string().required('Please provide the details'),
      addl_relevant_docs: Yup.string().required('Please specify list of relevant documents you have'),
    })),
  });

  const handleSaveAndSubmitForReview = () => {
    if (form.validate().hasErrors) {
      return false;
    }
    setIsSaved(SaveState.saving);
    updateClaim(
      {
        claimDetails: {
          ...claim,
          details: { ...claim.details, criticalInfo: form.getValues() },
          status: 'waiting_for_reviewer_response',
          notifyUser: true,
        },
        notifyUser: true,
      }
    )
      .then(() => setIsSaved(SaveState.saved))
      .catch(() => setIsSaved(SaveState.unsaved))
      .finally(() => setIsSaved(SaveState.saved));
    return false;
  };

  const handlePrevStepClick = () => {
    if (claim._id) navigate(sanitise(paths.claimsDetails, { claimId: claim._id }));
  };

  const renderUi = () => {
    switch (isSaved) {
      case SaveState.saved:
        return <Stack>
          <HeroText
            title="We have got your"
            titleHighlighted="Claim details"
            description="You will receive a confirmation email on your personal email address. Any updates on your claim will be sent to your email. Please stay in touch."
            primaryActnLabel="View Claims"
            secondaryActnLabel="Back to Edit"
            primaryAction={() => navigate(paths.claimsList)}
            secondaryAction={() => setIsSaved(SaveState.unsaved)}
          />
               </Stack>;
      case SaveState.saving:
      case SaveState.unsaved:
        return <>
          <LoadingOverlay visible={isSaved === SaveState.saving} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          <PageTitle title="Please provide below critical information" />
          <Grid>
            <GridCol>
              <Divider label="Personal details" labelPosition="left" />
            </GridCol>
            <GridCol span={6} mt="md">
              <TextInput
                label="What is your Policy Number ?"
                placeholder="POL12323123"
                key={form.key('addl_policy_number')}
                maxLength={100000}
                required
                {...form.getInputProps('addl_policy_number')}
              />
            </GridCol>
            <GridCol mt="md">
              <Divider variant="dashed" />
            </GridCol>
            <GridCol>
              <Stack>
                <Text size="sm" fw={500}>
                  Have you already appealed your denial?
                </Text>
                <Switch
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  key={form.key('addl_already_appealed_your_denial')}
                  {...form.getInputProps('addl_already_appealed_your_denial', { type: 'checkbox' })}
                />
              </Stack>
            </GridCol>
            {
              form.values.addl_already_appealed_your_denial &&
              <GridCol>
                <TransitionComp transition="fade-down">
                  <Textarea
                    label="Which appeal processes have you used?"
                    placeholder="Description"
                    key={form.key('addl_appeal_process')}
                    maxLength={100000}
                    required={form.values.addl_already_appealed_your_denial}
                    {...form.getInputProps('addl_appeal_process')}
                  />
                </TransitionComp>
              </GridCol>
            }
            <GridCol mt="md">
              <Divider variant="dashed" />
            </GridCol>
            <GridCol>
              <TextInput
                label="What is the claim number of your denied claim?"
                placeholder="Claim number"
                key={form.key('addl_deniel_claim_number')}
                maxLength={100}
                required
                {...form.getInputProps('addl_deniel_claim_number')}
              />
            </GridCol>
            <GridCol>
              <Textarea
                label="What are the billing codes associated with your claim?"
                placeholder="Eg: 93000 - Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report."
                key={form.key('addl_associated_billing_codes')}
                autosize
                maxLength={100000}
                minRows={3}
                {...form.getInputProps('addl_associated_billing_codes')}
              />
            </GridCol>

            <GridCol>
              <Textarea
                label={(() => (
                  <>
                    <span>
                      Describe your situation and why you think insurance should have approved
                      your claim?
                    </span>
                    <br />
                    <span>(Please be as detailed as possible! This information is critical to fighting your case)</span>
                  </>
                ))()}
                placeholder="Eg: I was having emergency cardiac services at an in-network provider. However, apparently the doctor who did the ECG on me was out of network. It was an emergency and he was the only one available. After the whole event, I got charged for the ECG! Makes no sense because it was an in-network hospital and I can't control who does my ECG!!!

I have evidence that this was an emergency since I ended up needing surgery - which was covered. So was hoping you could help me fight this denied ECG claim."
                key={form.key('addl_why_should_approve')}
                autosize
                minRows={3}
                maxLength={100000}
                required
                {...form.getInputProps('addl_why_should_approve')}
              />
            </GridCol>

            <GridCol>
              <Textarea
                label={(() => (
                  <>
                    <span>Please list and describe the contents of any relevant documents, test results, or expert opinions that may help your case.</span>
                  </>
                ))()}
                placeholder={`1. Record of EKG - shows that I was having heart issues before I had the surgery 
2. Blood test for BNP  - tests show that I was at risk for heart failure
3. Cardiologist referral in my Medical Records - my old doctor referred me to this specialist since I was at risk, and insurance still denied me!`}
                key={form.key('addl_relevant_docs')}
                autosize
                maxLength={100000}
                minRows={3}
                required
                {...form.getInputProps('addl_relevant_docs')}
              />
            </GridCol>

            <GridCol span={12}>
              <Group justify="center" my="xl">
                <Button
                  onClick={handlePrevStepClick}
                  variant="outline"
                  leftSection={<IconArrowLeft />}
                  size="md"
                >
                  Update Primary details
                </Button>
                <Button
                  onClick={handleSaveAndSubmitForReview}
                  variant="filled"
                  loading={isSaved === SaveState.saving}
                  rightSection={<IconCheck />}
                  size="md"
                >
                  Save and submit for review
                </Button>
              </Group>
            </GridCol>
          </Grid>
               </>;
    }
    return '';
  };

  return (
    <div style={{ position: 'relative' }}>
      <Box pos="relative">{renderUi()}</Box>
    </div>
  );
};

export default CriticalInfoForm;
