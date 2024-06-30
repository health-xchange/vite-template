import { Anchor, Button, Container, Group, InputLabel, Paper, PinInput, Space, Stack, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classes from './ForgotPassword.module.css';
import { paths } from '@/Router';
import { sendForgotPassword, sendNewPassword } from '@/actions/auth';
import { resetPasswordSchema } from '@/utils/schemas';
import { getEnvVars } from '@/utils/functions';

interface ResetState {
  referenceId: string;
  email: string;
}

let otpLength = getEnvVars().VITE_OTP_LENGTH;
otpLength = JSON.parse(otpLength);

const ResetPasswordForm: React.FC = () => {
  const location = useLocation();
  const locationState: ResetState = location.state;

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      otpToken: '',
      password: '',
      confirmPassword: '',
      isSubmitting: false,
      status: false,
    },
    validate: yupResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!locationState.referenceId) {
  //     navigate(paths.forgot_pwd);
  //   }
  // }, [locationState])

  const handleResendOtp = () => {
    form.setValues({ isSubmitting: true });
    toast.promise(
      sendForgotPassword(locationState.email),
      {
        error: 'Failed to send one time password. Please try again',
        success: 'One Time Password has been sent your email',
      },
      { position: 'bottom-center' }
    )
      .then((response) => {
        const { data } = response.data;
        navigate(paths.reset_pwd, { state: { referenceId: data.referenceId, email: locationState.email } });
      })
      .catch((err: Error) => {
        form.setFieldError('status', err.message);
      })
      .finally(() => {
        form.setFieldValue('isSubmitting', false);
      });
  };

  const handleSubmit = (values: typeof form.values) => {
    const { otpToken, password, confirmPassword } = values;
    form.setFieldValue('isSubmitting', true);
    toast.promise(
      sendNewPassword(locationState.referenceId, otpToken, password, confirmPassword),
      {
        error: 'Failed to reset password',
        success: 'Password was successfully reset. Please use the new password to signin to your account',
      },
      { position: 'bottom-center' }
    )
      .then(() => {
        navigate(paths.signIn);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        form.setFieldValue('isSubmitting', false);
      });
  };

  return (
    <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Reset Password
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack gap={1}>
            <InputLabel mb={3}>Enter One Time Password received on email</InputLabel>
            <PinInput
              oneTimeCode
              length={otpLength}
              key={form.key('otpToken')}
              {...form.getInputProps('otpToken')}
            />
          </Stack>
          <Space my={10} />
          <TextInput
            label="New Password"
            required
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <TextInput
            label="Confirm new-password"
            required
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" type="button" onClick={() => handleResendOtp()} size="sm">
              Resend Verification Code
            </Anchor>
            <Anchor to={paths.forgot_pwd} component={Link} size="sm">
              Change Email?
            </Anchor>
          </Group>
          <Button loading={form.values.isSubmitting} type="submit" fullWidth mt="xl">
            Update Password
          </Button>
        </Paper>
      </Container>
    </form>
  );
};

export default ResetPasswordForm;
