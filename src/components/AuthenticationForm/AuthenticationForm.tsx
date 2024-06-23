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
} from '@mantine/core';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { GoogleButton } from './GoogleButton';
import { AuthenticationPagesProps, RegisterUser, SignInResponse, SignInUser } from '@/interfaces/common';
import { registerUser, signInUser, verifyUserEmail } from '@/actions/auth';
import { atomAuthState } from '../../state/atoms';
import { getAuthTypeLabel } from '@/utils/functions';
import * as Yup from 'yup';
import classes from './AuthenticationForm.module.css';

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Email must have a valid domain name'),
  password: Yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*/\\])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  terms: Yup
    .boolean()
    .required('You need to accept terms and conditions')
    .oneOf([true], 'You need to accept terms and conditions'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Email must have a valid domain name'),
  password: Yup.string().required('Password is required'),
});


export function AuthenticationForm(props: AuthenticationPagesProps) {
  const { authType = '/login' } = props;
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(atomAuthState);
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
          render: ({ data }) => {
            return typeof data.data === 'string' ? data.data : 'Successfully verified your email. Now you can login';
          },
        }
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
    },
    validate: yupResolver(authType === '/register' ? registrationSchema : loginSchema)
  });

  const handleSignIn = (values: SignInUser) => {
    const { email, password } = values;
    toast.promise(
      signInUser({ email, password }),
      {
        pending: 'Signing...',
        success: 'Signin successful',
        error: {
          render({ data }: { data: any }) {
            return data?.response?.data || 'Signing failed';
          },
        },
      },
      { position: 'bottom-center' }
    )
      .then((response: SignInResponse) => {
        setLoginState({
          isLoggedIn: true,
          userInfo: { ...response.user, refreshToken: response.refreshToken },
        });
        navigate('/claims');
      })
      .catch(() => {
        // form.setFieldValue('password', '');
      });
  };

  const handleRegister = (values: RegisterUser) => {
    toast.promise(
      registerUser(values),
      {
        pending: 'Registering...',
        success: 'Registered successfully. Please check your email and verify your registration to proceed.',
        error: {
          render({ data }: { data: any }) {
            return data?.response?.data || 'Registration failed';
          },
        },
      },
      { position: 'bottom-center' }
    )
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
      });
  };

  const handleSubmit = (values: RegisterUser) => {
    (authType === '/register' ? handleRegister : handleSignIn)(values);
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} pos="relative">
      <LoadingOverlay visible={isVerifying} />
      <Text size="lg" fw={500}>
        Welcome to{" "}
        <Text component="span" className={classes.highlight} inherit>
          BlueGuardAI
        </Text>
        , {getAuthTypeLabel(authType)} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {authType === '/register' && (
            <TextInput
              label="First Name"
              placeholder="John"
              value={form.values.firstName}
              error={form.errors.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              radius="md"
            />
          )}
          {authType === '/register' && (
            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={form.values.lastName}
              error={form.errors.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              radius="md"
            />
          )}
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          {authType === '/register' && (
            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Re-enter password"
              value={form.values.confirmPassword}
              onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
              error={form.errors.confirmPassword}
              radius="md"
            />)
          }

          {authType === '/register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <NavLink to={authType === '/register' ? '/login' : '/register'}>
            <Anchor component="a" type="button" c="dimmed" size="xs" underline="never">
              {authType === '/register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
          </NavLink>
          <Button type="submit" radius="xl">
            {getAuthTypeLabel(authType)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
