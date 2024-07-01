import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
  Divider,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { useForm, yupResolver } from '@mantine/form';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import classes from './SignInForm.module.css';
import { paths } from '@/Router';
import { ApiError, SignInResponse } from '@/interfaces/common';
import { signInUser } from '@/actions/auth';
import { atomAuthState } from '@/state/atoms';
import { loginSchema } from '@/utils/schemas';
import LoginWithGoogle from '../AuthenticationForm/GoogleButton';

export function SignInForm() {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(atomAuthState);
  const hasLastVisisted = !!localStorage.getItem('last-visited');

  useEffect(() => {
    localStorage.setItem('last-visited', new Date().toISOString());
  }, []);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      authToken: '',
      iss: '',
      isSaving: false,
    },
    validate: yupResolver(loginSchema),
  });

  const handleSignIn = (values: typeof form.values) => {
    form.setFieldValue('isSaving', true);
    const { isSaving, rememberMe, ...signInPayload } = values;
    toast.promise<SignInResponse, AxiosError<ApiError>>(
      signInUser(signInPayload),
      {
        pending: 'Signing In...',
        success: 'Signin successful',
        error: {
          render({ data }) {
            return data.response?.data.message || 'Signing failed';
          },
        },
      },
      { toastId: 'sign-in-process', position: 'bottom-center' }
    )
      .then((response: SignInResponse) => {
        setLoginState({
          isLoggedIn: true,
          userInfo: { ...response.user, refreshToken: response.refreshToken },
        });
        form.setFieldValue('isSaving', false);
        navigate('/claims');
      })
      .catch(() => {
        form.setFieldValue('isSaving', false);
      });
  };

  const handleGoogleSignIn = (authToken: string) => {
    form.setValues({ authToken, iss: 'google' });
    handleSignIn({ ...form.values, authToken, iss: 'google' });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSignIn(values))}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome {hasLastVisisted && 'back!'}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to={paths.register}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">

          <TextInput
            label="Email"
            placeholder="name@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              checked={form.values.rememberMe}
              onChange={(event) => form.setFieldValue('rememberMe', event.currentTarget.checked)}
            />
            <Anchor to={paths.forgot_pwd} component={Link} size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Stack>
            <Button variant="gradient" loading={form.values.isSaving} type="submit" fullWidth mt="xl">
              Sign in
            </Button>
            <LoginWithGoogle dispatchSignInGoogle={handleGoogleSignIn} label="Sign In With Google" />
          </Stack>
        </Paper>
      </Container>
    </form>
  );
}
