import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useForm, yupResolver } from '@mantine/form';
import { toast } from 'react-toastify';
import classes from './ForgotPassword.module.css';
import { paths } from '@/Router';
import { forgotPasswordSchema } from '@/utils/schemas';
import { sendForgotPassword } from '@/actions/auth';

export function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      isSubmitting: false,
      error: '',
    },
    validate: yupResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = (values: typeof form.values) => {
    form.setValues({ isSubmitting: true, error: '' });
    toast.promise(
      sendForgotPassword(values.email),
      {
        error: 'Failed to send an reset password link',
        success: 'Please use the One time password received on your email to reset your password',
      },
      { position: 'bottom-center' }
    )
      .then((response) => {
        form.setValues({ isSubmitting: false, error: '' });
        const { data } = response.data;
        navigate(paths.reset_pwd, { state: { referenceId: data.referenceId, email: values.email } });
      })
      .catch((err: Error) => {
        form.setFieldError('status', err.message);
        form.setValues({ isSubmitting: false, error: err.message || 'Couldnt process your request.' });
      });
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <form onSubmit={form.onSubmit(values => handleForgotPassword(values))}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control} onClick={() => navigate(paths.signIn)}>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type="submit" loading={form.values.isSubmitting} className={classes.control}>Reset password</Button>
            {form.errors.status && <Text c="red">{form.values.error}</Text>}
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
