import { useState } from 'react';
import * as Yup from 'yup';
import { Stepper, Button, Group, TextInput, PasswordInput, Code, Grid, GridCol, Combobox, useCombobox, Select, Autocomplete, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useFormik } from 'formik';
const DEFAULT_SELECT_MSG = 'Please select an option';

export default function NewClaimForm() {
  const [active, setActive] = useState(0);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  // const validationSchema = {
  //   first_name: Yup.string().required('First name is required'),
  //   last_name: Yup.string().required('Last name is required'),
  //   state: Yup.string().required('State is required'),
  //   is_dental: Yup.string().required(DEFAULT_SELECT_MSG),
  //   insurance_type: Yup.string().required('May we know type of insurance'),
  //   insurance_provider: Yup.string().required('Let us know your Insurance provider'),
  //   date_of_claim_denial: Yup.string().required('Let us know when it was denied'),
  //   claim_amount: Yup.string().required('Let us know your claim amount'),
  //   reason_for_claim_denial: Yup.string().required('Please provide reason for denial'),
  //   oon_emergency_service: Yup.string().required(DEFAULT_SELECT_MSG),
  //   oon_is_in_network_service: Yup.string().required(DEFAULT_SELECT_MSG),
  //   oon_is_signed_consent: Yup.string().required(DEFAULT_SELECT_MSG),
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     first_name: '',
  //     last_name: '',
  //     state: '',
  //     is_dental: undefined,
  //     insurance_type: undefined,
  //     insurance_provider: undefined,
  //     date_of_claim_denial: undefined,
  //     claim_amount: undefined,
  //     reason_for_claim_denial: undefined,
  //     oon_emergency_service: undefined,
  //     oon_is_in_network_service: undefined,
  //     oon_is_signed_consent: undefined,
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      first_name: '',
      last_name: '',
      state: '',
      is_dental: undefined,
      insurance_type: undefined,
      insurance_provider: undefined,
      date_of_claim_denial: undefined,
      claim_amount: undefined,
      reason_for_claim_denial: undefined,
      oon_emergency_service: undefined,
      oon_is_in_network_service: undefined,
      oon_is_signed_consent: undefined,

      // username: '',
      // password: '',
      // name: '',
      // email: '',
      // website: '',
      // github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          first_name:
            values.first_name.trim().length < 3 ? 'Name must include at least 6 characters' : null,
          last_name: values.first_name.length < 1 ? 'Last name is required' : null,
        };
      }

      if (active === 1) {
        return {
          name:
            values.first_name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          email: /^\S+@\S+$/.test(values.first_name) ? null : 'Invalid email',
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
      <Stepper active={active}>
        <Stepper.Step
          label="Basic information"
          description="Let us know basic details of your claim"
        >
          <Grid>
            <GridCol span={6}>
              <TextInput
                label="First Name"
                placeholder="John"
                key={form.key('first_name')}
                {...form.getInputProps('first_name')}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                label="Last Name"
                placeholder="Doe"
                key={form.key('last_name')}
                {...form.getInputProps('last_name')}
              />
            </GridCol>
            <GridCol span={6}>
              <Autocomplete label="State" placeholder='Pick your state' data={['Andhrapradesh', 'Telangana', 'Tamilnadu', 'Karnataka', 'Kerala']} />
            </GridCol>
            <GridCol>
              <Switch label="Is this is for Dental, Vision or Cosmetic claim?" placeholder='Pick your state' />
            </GridCol>
          </Grid>
          {/* <TextInput
            label="Full Name"
            id='first_name'
            placeholder="John Doe"
            name={'first_name'}
            key={'first_name'}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && formik.errors.first_name}
          /> */}
          {/* <PasswordInput
            mt="md"
            label="Password"
            placeholder="Password"
            key={form.key('password')}
            {...form.getInputProps('password')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Final step">
          {/* <TextInput
            label="First Name"
            placeholder="John"
            key={form.key('first_name')}
            {...form.getInputProps('first_name')}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            key={form.key('last_name')}
            {...form.getInputProps('last_name')}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            key={form.key('github')}
            {...form.getInputProps('github')}
          /> */}
        </Stepper.Step>

        <Stepper.Step label="Insurance Documents" description="Lets see the details of insurance">
          {/* <TextInput
            label="Name"
            placeholder="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          /> */}
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {/* {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>} */}
      </Group>
    </>
  );
}
