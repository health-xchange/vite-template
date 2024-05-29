import { useForm } from '@mantine/form';
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
  Loader,
  Box,
  Center,
} from '@mantine/core';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { GoogleButton } from './GoogleButton';
import { AuthenticationPagesProps, RegisterUser, SignInUser } from '@/interfaces/common';
import { registerUser, signInUser } from '@/actions/auth';
import { atomAuthState } from '../../state/atoms';

export function AuthenticationForm(props: AuthenticationPagesProps) {
  const { authType } = props;
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(atomAuthState);
  const params = useParams();

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      terms: true,
      iss: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },

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
      .then((response) => {
        setLoginState({ isLoggedIn: true, userInfo: response.user });
        navigate('/claims');
      })
      .catch(() => {
        form.setFieldValue('password', '');
      });
  };

  const handleRegister = (values: RegisterUser) => {
    toast.promise(
      registerUser(values),
      {
        pending: 'Registering...',
        success: 'Registered successfully',
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
        form.setFieldValue('password', '');
      });
  };

  const handleSubmit = (values: RegisterUser) => {
    (authType === '/login' ? handleSignIn : handleRegister)(values);
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} pos="relative">
      <LoadingOverlay visible />
      <Text size="lg" fw={500}>
        Welcome to Mantine, {authType} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          {authType === '/register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {authType === '/register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
            {authType === '/login' ? 'Login' : 'Register'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
