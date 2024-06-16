import React from 'react';
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PageTitle } from '../PageTitle/PageTitle';
import { NewFormProps } from '@/interfaces/common';
import { useNavigate } from 'react-router-dom';
import { sanitise } from '@/utils/functions';
import { paths } from '@/Router';

const CriticalInfoForm: React.FC<NewFormProps> = ({ claim, updateClaim }) => {
  const navigate = useNavigate();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { ...claim.details.criticalInfo },
  });

  const handleSaveAndSubmitForReview = () => {
    if (form.validate().hasErrors) {
      return false;
    }
    updateClaim(
      { ...claim, details: { ...claim.details, criticalInfo: form.getValues() }, status: 'waiting_for_reviewer_response' },
    );
    return false;
  };

  const handlePrevStepClick = () => {
    if (claim._id) navigate(sanitise(paths.claimsDetails, { claimId: claim._id }));
  };

  return (
    <div style={{ position: 'relative' }}>
      <PageTitle title="Let us help on your new claim" />
      <Grid>
        <GridCol>
          <Divider label="Personal details" labelPosition="left" />
        </GridCol>
        <GridCol span={6} mt="md">
          <TextInput
            label="What is your Policy Number ?"
            placeholder="POL12323123"
            key={form.key('addl_policy_number')}
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
              <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                *
              </Text>
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
        <GridCol>
          <Textarea
            label="Which appeal processes have you used?"
            placeholder="Description"
            key={form.key('addl_appeal_process')}
            required
            {...form.getInputProps('addl_appeal_process')}
          />
        </GridCol>
        <GridCol>
          <Textarea
            label="What is the claim number of your denied claim?"
            placeholder="Claim number"
            key={form.key('addl_deniel_claim_number')}
            required
            {...form.getInputProps('addl_deniel_claim_number')}
          />
        </GridCol>
        <GridCol mt="md">
          <Divider variant="dashed" />
        </GridCol>
        <GridCol>
          <Textarea
            label="What are the billing codes associated with your claim?"
            placeholder="Billing codes"
            key={form.key('addl_associated_billing_codes')}
            autosize
            minRows={3}
            required
            {...form.getInputProps('addl_associated_billing_codes')}
          />
        </GridCol>

        <GridCol>
          <Textarea
            label={(() => {
              return (
                <>
                  <span>
                    Please describe your situation and why you think insurance should have approved
                    your claim ?
                  </span>
                  <br />
                  <span>(Please be as detailed as possible, we use this to inform our case)</span>
                </>
              );
            })()}
            placeholder="Description"
            key={form.key('addl_why_should_approve')}
            autosize
            minRows={3}
            required
            {...form.getInputProps('addl_why_should_approve')}
          />
        </GridCol>

        <GridCol>
          <Textarea
            label={(() => {
              return (
                <>
                  <span>Please enter all the relevant documents you have and their contents?</span>
                  <br />
                  <span>
                    (Please include any medical records, expert opinions, or other evidence to
                    support your appeal)
                  </span>
                </>
              );
            })()}
            placeholder="Description"
            key={form.key('addl_relevant_docs')}
            autosize
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
              rightSection={<IconCheck />}
              size="md"
            >
              Save and submit for review
            </Button>
          </Group>
        </GridCol>
      </Grid>

      {/* <FormFooter /> */}
    </div>
  );
};

export default CriticalInfoForm;
