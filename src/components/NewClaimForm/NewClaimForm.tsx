import { useState } from 'react';
import {
  IconBuilding,
  IconCalendar,
  IconCurrencyDollar,
  IconHealthRecognition,
  IconMan,
  IconManFilled,
  IconMapPin,
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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { STATES_LIST } from '@/utils/states';

export default function NewClaimForm() {
  const [active, setActive] = useState(0);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      first_name: '',
      last_name: '',
      state: '',
      is_not_cosmetic_claim: false,
      insurance_type: undefined,
      insurance_provider: undefined,
      date_of_claim_denial: undefined,
      claim_amount: undefined,
      reason_for_claim_denial: undefined,
      oon_emergency_service: undefined,
      oon_is_in_network_service: undefined,
      oon_is_signed_consent: undefined,
      consent_opt1: false,
      consent_opt2: false,
      consent_opt3: false,
      consent_opt4: false,
    },

    validate: (values) => {
      if (active === 0) {
        return {
          first_name:
            values.first_name.trim().length < 3
              ? 'First name must include at least 3 characters'
              : null,
          last_name: values.first_name.length < 1 ? 'Last name is required' : null,
          date_of_claim_denial: 'if more than 5 months, we cannot help you',
        };
      }

      if (active === 1) {
        return {
          first_name:
            values.first_name.trim().length < 2
              ? 'Last name must include at least 2 characters'
              : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Grid>
        <GridCol mt="md">
          <Divider label="Personal details" labelPosition="left" />
        </GridCol>
        <GridCol span={6} mt="md">
          <TextInput
            label="First Name"
            leftSection={<IconManFilled style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            placeholder="John"
            key={form.key('first_name')}
            required
            {...form.getInputProps('first_name')}
          />
        </GridCol>
        <GridCol span={6} mt="md">
          <TextInput
            label="Last Name"
            placeholder="Doe"
            leftSection={<IconMan style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            required
            key={form.key('last_name')}
            {...form.getInputProps('last_name')}
          />
        </GridCol>
        <GridCol span={6} mt="md">
          <Autocomplete
            label="What state do you live in ?"
            required
            leftSection={<IconMapPin style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            placeholder="Pick your state"
            data={STATES_LIST}
          />
        </GridCol>
        <GridCol mt="md">
          <Divider label="Insurence details" labelPosition="left" />
        </GridCol>
        <GridCol span={12} mt="md">
          <Stack>
            <Text size="sm" fw={500}>
              Please note currently we are not taking claims relavant to Dental, Vision or Cosmetic{' '}
              <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                *
              </Text>
            </Text>
            <Checkbox
              label={<>I confirm that claims were not relavant to Dental, Visison or Cosmetic</>}
              key={form.key('is_not_cosmetic_claim')}
              {...form.getInputProps('is_not_cosmetic_claim', { type: 'checkbox' })}
            />
          </Stack>
        </GridCol>
        <GridCol span={6} mt="md">
          <Select
            label="What type of insurance do you have ?"
            required
            placeholder="Select insurance type"
            leftSection={
              <IconHealthRecognition style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            }
            data={['Medicare Advantage', 'Medicare ', 'Medicaid', 'Employer or Private Insurance']}
            key={form.key('insurance_type')}
            {...form.getInputProps('insurance_type')}
          />
        </GridCol>
        <GridCol span={6} mt="md">
          <TextInput
            label="Who is your insurance provider ?"
            placeholder="Select"
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
            leftSection={<IconCalendar style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            key={form.key('date_of_claim_denial')}
            {...form.getInputProps('date_of_claim_denial')}
          />
        </GridCol>
        <GridCol span={6} mt="md">
          <NumberInput
            label="Claim amount"
            placeholder="Dollars"
            leftSection={
              <IconCurrencyDollar style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            }
            key={form.key('claim_amount')}
            thousandSeparator=" "
            {...form.getInputProps('claim_amount')}
          />
        </GridCol>
        <GridCol mt="md">
          <Divider variant="dashed" />
        </GridCol>
        <GridCol mt="md">
          <RadioGroup
            label="What is the reason stated in your denial letter ?"
            key={form.key('reason_for_claim_denial')}
            {...form.getInputProps('reason_for_claim_denial')}
          >
            <Stack mt="md">
              <Radio
                value="optoin_1"
                label={'The benefit you used or are seeking is partially denied or isn\'t a “covered service”'}
              />
              <Radio
                value="optoin_2"
                label="Your medical problem required a “prior authoriation”"
              />
              <Radio
                value="optoin_3"
                label="Your medical problem began before you joined the plan"
              />
              <Radio
                value="optoin_4"
                label={'You received health services from a health provider or facility that isn\'t in your plan\'s approved network (an “out-of-network” provider)'}
              />
              <Radio
                value="optoin_5"
                label="The requested service or treatment is “not medically necessary”"
              />
              <Radio
                value="optoin_6"
                label="The requested service or treatment is an “experimental” or “investigative” treatment"
              />
              <Radio
                value="optoin_7"
                label="You are no longer enrolled or eligible to be enrolled in the health plan"
              />
              <Radio
                value="optoin_8"
                label="It is revoking, or cancelling your coverage going back to the date you enrolled, because the insurer claims that you gave false or incomplete information when you applied for coverage. This action is often referred to as a rescission of coverage."
              />
              <Radio value="optoin_9" label={<Textarea label="Other" w="200%" />} />
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
              key={form.key('oon_emergency_service')}
              {...form.getInputProps('oon_emergency_service', { type: 'checkbox' })}
            />
          </Stack>
        </GridCol>
        <GridCol mt="md">
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
              key={form.key('oon_is_in_network_service')}
              {...form.getInputProps('oon_is_in_network_service', { type: 'checkbox' })}
            />
          </Stack>
        </GridCol>
        <GridCol mt="md">
          <Divider variant="dashed" />
        </GridCol>
        <GridCol>
          <Stack>
            <Text size="sm" fw={500}>
              Did you sign a &quot;notice and consent form&quot; for out-of-network
              post-stabilization services? (you can check if you signed this by
              calling the provider and asking for a copy)
              <Text span c="var(--input-asterisk-color, var(--mantine-color-error))" inherit>
                *
              </Text>
            </Text>
            <Switch
              size="lg"
              onLabel="Yes"
              offLabel="No"
              key={form.key('oon_is_signed_consent')}
              {...form.getInputProps('oon_is_signed_consent', { type: 'checkbox' })}
            />
            <Grid pl="lg" mt="md">
              <Stack>
                <Checkbox
                  key={form.key('consent_opt1')}
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
                  label={
                    <Text size="sm" fw={500}>
                      Given to you in the way you prefer, either printed on paper or emailed.
                    </Text>
                  }
                  {...form.getInputProps('consent_opt2', { type: 'checkbox' })}
                />
                <Checkbox
                  key={form.key('consent_opt3')}
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
          <Group justify="flex-start" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        </GridCol>
      </Grid>
    </>
  );
}
