import React, { } from 'react';
import {
  IconArrowRight,
  IconBuilding,
  IconCalendar,
  IconCreditCardPay,
  IconCurrencyDollar,
  IconHealthRecognition,
  IconMan,
  IconManFilled,
  IconMapPin,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
import {
  Button,
  Group,
  TextInput,
  Grid,
  GridCol,
  useCombobox,
  Select,
  Autocomplete,
  Checkbox,
  Text,
  Stack,
  Divider,
  NumberInput,
  rem,
  Radio,
  RadioGroup,
  Textarea,
  Switch,
  useMantineTheme,
} from '@mantine/core';
// import { DatePickerInput } from '@mantine/dates';
import { STATES_LIST } from '@/utils/states';
import { PageTitle } from '../PageTitle/PageTitle';
import { DatePickerInput } from '@mantine/dates';
import moment from 'moment';
import classes from './NewClaimForm.module.css';
import useNewClaimForm from './useNewClaimForm';
import { useClaim } from '@/hooks/useClaim';

const NewClaimForm: React.FC = () => {
  const { claimDetails: { data: claim } } = useClaim();
  const { isFormSaving, claimForm: form, handleSaveAndNextClick, isNotCosmeticClaim, maxAllowedDays } = useNewClaimForm();
  const theme = useMantineTheme();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <div style={{ position: 'relative' }}>
      <PageTitle title="Let us help on your new claim" />
      {/* <Group justify="space-between" align="center" pos="sticky" top={0} bg="gray">
        <Group justify="center">
          <Button disabled={!isFormHasChanges} onClick={handleSaveDraft} variant="default" color={theme.colors.red[6]} leftSection={isFormHasChanges ? <IconDeviceFloppy color={theme.colors.dark[7]} size={14} /> : <IconCheck color={theme.colors.green[3]} size={14} />} size="compact-sm">Save as Draft</Button>
          <Button disabled={!isFormHasChanges} variant="default" color={theme.colors.red[6]} leftSection={<IconSend color={theme.colors.yellow[7]} size={14} />} size="compact-sm">Submit for review</Button>
        </Group>
      </Group> */}

      <Grid>
        <GridCol>
          <Divider label="Personal details" labelPosition="left" />
        </GridCol>
        <GridCol span={{ xs: 12, sm: 6 }} mt="md">
          <TextInput
            label="First Name"
            leftSection={<IconManFilled style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            placeholder="John"
            key={form.key('first_name')}
            required
            {...form.getInputProps('first_name')}
          />
        </GridCol>
        <GridCol span={{ xs: 12, sm: 6 }} mt="md">
          <TextInput
            label="Last Name"
            placeholder="Doe"
            leftSection={<IconMan style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            required
            key={form.key('last_name')}
            {...form.getInputProps('last_name')}
          />
        </GridCol>
        <GridCol span={{ xs: 12, sm: 6 }} mt="md">
          <Autocomplete
            label="What state do you live in ?"
            required
            leftSection={<IconMapPin style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            placeholder="Pick your state"
            data={STATES_LIST}
            key={form.key('state')}
            {...form.getInputProps('state')}
          />
        </GridCol>
        <GridCol mt="md">
          <Divider label="Insurence details" labelPosition="left" />
        </GridCol>
        <GridCol span={12} mt="md">
          <Stack>
            <Text size="sm" fw={500}>
              Please confirm your claim is not relavant to Dental, Vision or Cosmetic{' '}
              <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                *
              </Text>
            </Text>
            <Group>

              <Switch
                size='xl'
                onLabel={<Text w={120} pl={10}>Not cosmetic</Text>}
                offLabel={<Text w={120} pr={10}>Cosmetic</Text>}
                key={form.key('is_not_cosmetic_claim')}
                required
                thumbIcon={
                  form.values.is_not_cosmetic_claim ? (
                    <IconThumbUp
                      style={{ width: rem(18), height: rem(18) }}
                      color={theme.colors.teal[6]}
                      stroke={2}
                    />
                  ) : (
                    <IconThumbDown
                      style={{ width: rem(18), height: rem(18) }}
                      color={theme.colors.red[6]}
                      stroke={2}
                    />
                  )
                }
                {...form.getInputProps('is_not_cosmetic_claim', { type: 'checkbox' })}
              />
              {
                form.values.is_not_cosmetic_claim ?
                  <Text size='sm' mt={4} c='green'>We support this claim. Please give us more details about this claim</Text> :
                  (form.isTouched('is_not_cosmetic_claim') ?
                    <Text size='sm' c={'red'} mt={4}>Sorry, currently we cannot support dental, vision or cosmetic claims.</Text> : '')
              }
            </Group>
          </Stack>
        </GridCol>
        <GridCol mt="md">
          <Divider variant="dashed" />
        </GridCol>
        {
          isNotCosmeticClaim &&
          <div className={!isNotCosmeticClaim ? classes.disabled : ''}>
            <Grid>
              <GridCol span={6} mt="md">
                <Select
                  label="What type of insurance do you have ?"
                  required
                  disabled={!isNotCosmeticClaim}
                  placeholder="Select insurance type"
                  leftSection={
                    <IconHealthRecognition style={{ width: rem(18), height: rem(20) }} stroke={1.5} />
                  }
                  data={['Medicare Advantage', 'Medicare ', 'Medicaid', 'Employer or Private Insurance']}
                  key={form.key('insurance_type')}
                  {...form.getInputProps('insurance_type')}
                />
              </GridCol>
              <GridCol span={6} mt="md">
                <TextInput
                  label="Who is your insurance provider ?"
                  placeholder="name of insurance provider"
                  disabled={!isNotCosmeticClaim}
                  leftSection={<IconBuilding style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                  required
                  key={form.key('insurance_provider')}
                  {...form.getInputProps('insurance_provider')}
                />
              </GridCol>
              <GridCol span={6} mt="md">
                <DatePickerInput
                  label="When were you notified of the claim denial ?"
                  placeholder="Date"
                  disabled={!isNotCosmeticClaim}
                  minDate={moment().subtract(maxAllowedDays, 'days').toDate()}
                  maxDate={moment().toDate()}
                  required
                  leftSection={<IconCalendar style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                  key={form.key('date_of_claim_denial')}
                  weekendDays={[]}
                  {...form.getInputProps('date_of_claim_denial')}
                />
              </GridCol>
              <GridCol span={6} mt="md">
                <NumberInput
                  label="Claim amount"
                  placeholder="Dollars"
                  min={10}
                  required
                  disabled={!isNotCosmeticClaim}
                  leftSection={
                    <IconCurrencyDollar style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  }
                  key={form.key('claim_amount')}
                  thousandSeparator=" "
                  {...form.getInputProps('claim_amount')}
                />
              </GridCol>
            </Grid>
            <GridCol mt="md">
              <Divider variant="dashed" />
            </GridCol>
            <GridCol mt="md">
              <RadioGroup
                label="What is the reason stated in your denial letter ?"
                key={form.key('reason_for_claim_denial')}
                aria-disabled={!isNotCosmeticClaim}
                {...form.getInputProps('reason_for_claim_denial')}
              >
                <Stack mt="md">
                  <Radio
                    value="optoin_1"
                    disabled={!isNotCosmeticClaim}
                    label={
                      "The benefit you used or are seeking is partially denied or isn't a “covered service”"
                    }
                  />
                  <Radio
                    value="optoin_2"
                    disabled={!isNotCosmeticClaim}
                    label="Your medical problem required a “prior authoriation”"
                  />
                  <Radio
                    value="optoin_3"
                    disabled={!isNotCosmeticClaim}
                    label="Your medical problem began before you joined the plan"
                  />
                  <Radio
                    value="optoin_4"
                    disabled={!isNotCosmeticClaim}
                    label={
                      "You received health services from a health provider or facility that isn't in your plan's approved network (an “out-of-network” provider)"
                    }
                  />
                  <Radio
                    value="optoin_5"
                    disabled={!isNotCosmeticClaim}
                    label="The requested service or treatment is “not medically necessary”"
                  />
                  <Radio
                    value="optoin_6"
                    disabled={!isNotCosmeticClaim}
                    label="The requested service or treatment is an “experimental” or “investigative” treatment"
                  />
                  <Radio
                    value="optoin_7"
                    disabled={!isNotCosmeticClaim}
                    label="You are no longer enrolled or eligible to be enrolled in the health plan"
                  />
                  <Radio
                    value="optoin_8"
                    disabled={!isNotCosmeticClaim}
                    label="It is revoking, or cancelling your coverage going back to the date you enrolled, because the insurer claims that you gave false or incomplete information when you applied for coverage. This action is often referred to as a rescission of coverage."
                  />
                  <Radio value="optoin_9" disabled={!isNotCosmeticClaim} label={<Textarea
                    disabled={!isNotCosmeticClaim} label={<Text size='sm'>Other</Text>} cols={100} />} />
                </Stack>
              </RadioGroup>
            </GridCol>
            <GridCol mt="md">
              <Divider variant="dashed" />
            </GridCol>
            <GridCol>
              <Stack>
                <Text size="sm" fw={500}>
                  Was the service provided an emergency service or a post-emergency stabilization
                  services (ie. surgery centers, ER, right after the ER in another department)?
                  <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                    *
                  </Text>
                </Text>
                <Switch
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  disabled={!isNotCosmeticClaim}
                  key={form.key('oon_emergency_service')}
                  {...form.getInputProps('oon_emergency_service', { type: 'checkbox' })}
                />
              </Stack>
            </GridCol>
            <GridCol>
              <Divider variant="dashed" />
            </GridCol>
            <GridCol>
              <Stack>
                <Text size="sm" fw={500}>
                  Was the service or treatment delivered at an in-network location? (ie. your location
                  is in network, but the provider is out of network)
                  <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                    *
                  </Text>
                </Text>
                <Switch
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  disabled={!isNotCosmeticClaim}
                  key={form.key('oon_is_in_network_service')}
                  {...form.getInputProps('oon_is_in_network_service', { type: 'checkbox' })}
                />
              </Stack>
            </GridCol>
            <GridCol>
              <Divider variant="dashed" />
            </GridCol>
            <GridCol>
              <Stack>
                <Text size="sm" fw={500}>
                  Did you sign a &quot;notice and consent form&quot; for out-of-network
                  post-stabilization services? (you can check if you signed this by calling the provider
                  and asking for a copy)
                  <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                    *
                  </Text>
                </Text>
                <Switch
                  size="lg"
                  onLabel="Yes"
                  offLabel="No"
                  disabled={!isNotCosmeticClaim}
                  key={form.key('oon_is_signed_consent')}
                  {...form.getInputProps('oon_is_signed_consent', { type: 'checkbox' })}
                />
                <Grid pl="lg" mt="md">
                  <Stack>
                    <Checkbox
                      key={form.key('consent_opt1')}
                      disabled={!form.values.oon_is_signed_consent || !isNotCosmeticClaim}
                      label={
                        <Text size="sm" fw={500}>
                          Given separately from other documents. It can&apos;t be attached to, or hidden
                          within, your other paperwork.
                        </Text>
                      }
                      {...form.getInputProps('consent_opt1', { type: 'checkbox' })}
                    />
                    <Checkbox
                      key={form.key('consent_opt2')}
                      disabled={!form.values.oon_is_signed_consent || !isNotCosmeticClaim}
                      label={
                        <Text size="sm" fw={500}>
                          Given to you in the way you prefer, either printed on paper or emailed.
                        </Text>
                      }
                      {...form.getInputProps('consent_opt2', { type: 'checkbox' })}
                    />
                    <Checkbox
                      key={form.key('consent_opt3')}
                      disabled={!form.values.oon_is_signed_consent || !isNotCosmeticClaim}
                      label={
                        <Text size="sm" fw={500}>
                          Made available in any of the 15 most common languages spoken in the state
                          where you got care. And if you speak a different language, they must give you
                          access to an interpreter.
                        </Text>
                      }
                      {...form.getInputProps('consent_opt3', { type: 'checkbox' })}
                    />
                    <Checkbox
                      key={form.key('consent_opt4')}
                      disabled={!form.values.oon_is_signed_consent || !isNotCosmeticClaim}
                      label={
                        <Text size="sm" fw={500}>
                          Given to you in advance. Timing requirements vary based on when you scheduled
                          your care.
                        </Text>
                      }
                      {...form.getInputProps('consent_opt4', { type: 'checkbox' })}
                    />
                  </Stack>
                </Grid>
              </Stack>
            </GridCol>
            <GridCol span={12}>
              <Group justify="center" my="xl">
                {/* <Button onClick={handleSaveDraft} variant="default" color={theme.colors.red[6]} leftSection={isFormHasChanges ? <IconDeviceFloppy color={theme.colors.dark[7]} size={14} /> : <IconCheck color={theme.colors.green[3]} size={14} />} size="compact-sm">Save as Draft</Button> */}
                {claim?.status === 'draft' || claim?.status === 'waiting_for_payment' ? (
                  <Button
                    onClick={handleSaveAndNextClick}
                    variant="filled"
                    disabled={!isNotCosmeticClaim}
                    rightSection={<IconCreditCardPay />}
                    size="md"
                  >
                    Save & Proceed for payment
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveAndNextClick}
                    variant="filled"
                    rightSection={<IconArrowRight />}
                    size="md"
                  >
                    Update Additional Info
                  </Button>
                )}
                {/* {isModalOpened && transaction && transaction?.client_secret && (
                
              )} */}
              </Group>
            </GridCol>
          </div>
        }
      </Grid>
    </div>
  );
};

export default NewClaimForm;
