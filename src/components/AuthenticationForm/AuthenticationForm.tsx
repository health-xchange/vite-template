import { useForm, yupResolver } from '@mantine/form';
import { toast } from 'react-toastify';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Stack,
  Anchor,
  LoadingOverlay,
  Container,
} from '@mantine/core';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { upperFirst } from '@mantine/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import LoginWithGoogle from './GoogleButton';
import { ApiError, RegisterUser } from '@/interfaces/common';
import { getGoogleUser, registerUser, verifyUserEmail } from '@/actions/auth';
// import { atomAuthState } from '../../state/atoms';
import classes from './AuthenticationForm.module.css';
import { paths } from '@/Router';

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  iss: Yup.string(),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Email must have a valid domain name'),
  password: Yup
    .string()
    .when('iss', {
      is: '',
      then: (schema) => schema.required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*/\\])/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    }),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  terms: Yup
    .boolean()
    .required('You need to accept terms and conditions')
    .oneOf([true], 'You need to accept terms and conditions'),
});

export function RegistrationForm() {
  // const { authType = '/login' } = props;
  const navigate = useNavigate();
  // const setLoginState = useSetRecoilState(atomAuthState);
  const { email: verifyingEmail, token: verificationToken } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyEmail = useCallback(() => {
    if (verifyingEmail && verificationToken) {
      toast.promise(verifyUserEmail(verifyingEmail, verificationToken), {
        pending: {
          render: () => { setIsVerifying(true); return 'Verifying your email...'; },
        },
        error: 'Could not verify your email. please try again',
        success: {
          render: ({ data }) => typeof data.data === 'string' ? data.data : 'Successfully verified your email. Now you can login',
        },
      })
        .finally(() => setIsVerifying(false));
    }
  }, [verifyingEmail, verificationToken]);

  useEffect(() => {
    handleVerifyEmail();
  }, [verifyingEmail, verificationToken]);

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      terms: false,
      iss: '',
      googleToken: '',
      isSubmitting: false,
    },
    validate: yupResolver(registrationSchema),
  });

  const handleRegister = (values: RegisterUser) => {
    toast.promise<AxiosResponse, AxiosError<ApiError>>(
      registerUser(values),
      {
        pending: 'Registering...',
        success: 'Registered successfully. Please check your email and verify your registration to proceed.',
        error: {
          render({ data }) {
            return data.response?.data.message || 'Registration failed';
          },
        },
      },
      { toastId: 'registration-process', position: 'bottom-center' }
    )
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
      });
  };

  const handleGoogleRegister = (userToken: string) => {
    form.setValues({ googleToken: userToken, isSubmitting: true });
    getGoogleUser(userToken)
      .then((googleUser) => {
        if (!googleUser) return;
        const { email, name, iss } = googleUser;
        const [firstName, ...lastName] = name.split(' ');
        form.setValues({
          firstName,
          lastName: lastName.join(' '),
          email,
          iss,
        });
      })
      .catch(() => {
        console.log('Failed to validate user login');
      })
      .finally(() => {
        form.setFieldValue('isSubmitting', false);
      });
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder pos="relative">
        <LoadingOverlay visible={isVerifying} />
        <Text size="lg" fw={500} mb={form.values.iss ? 'xl' : ''}>
          Welcome to{' '}
          <Text component="span" className={classes.highlight} inherit>
            BlueGuardAI
          </Text>
          {
            !form.values.iss ? ', Register with' : ''
          }
        </Text>
        {
          !form.values.iss &&
          <Group grow mb="md" mt="md">
            <LoginWithGoogle dispatchSignInGoogle={handleGoogleRegister} label="Sign Up With Google" />
          </Group>
        }
        {
          !form.values.iss &&
          <Divider label="Or continue with email" labelPosition="center" my="lg" />
        }

        <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
          <Stack>
            <TextInput
              label="First Name"
              placeholder="John"
              value={form.values.firstName}
              error={form.errors.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={form.values.lastName}
              error={form.errors.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              disabled={!!form.values.iss}
              radius="md"
            />
            {
              !form.values.iss &&
              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password}
                radius="md"
              />
            }
            {
              !form.values.iss &&
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter password"
                value={form.values.confirmPassword}
                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                error={form.errors.confirmPassword}
                radius="md"
              />
            }
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <NavLink to={paths.signIn}>
              <Anchor component="a" type="button" c="dimmed" size="xs" underline="never">
                Already have an account? Login
              </Anchor>
            </NavLink>
            <Button type="submit" radius="xl">
              Register {form.values.iss ? `with ${upperFirst(form.values.iss)}` : ''}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
