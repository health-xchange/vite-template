import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandDiscord } from '@tabler/icons-react';
import { useForm, yupResolver } from '@mantine/form';
import { toast } from 'react-toastify';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactForm.module.css';
import { contactFormSchema } from '@/utils/schemas';
import { sendContactQuery } from '@/actions/contact';
import { useLogin } from '@/state/hooks';

const social = [IconBrandTwitter, IconBrandDiscord];

export function ContactForm() {
  const { userInfo } = useLogin();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: userInfo?.email || '',
      name: userInfo?.firstName ? `${userInfo?.firstName} ${userInfo?.lastName}` : '',
      message: '',
      isSubmitting: false,
    },
    validate: yupResolver(contactFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    const { name, email, message } = values;
    toast.promise(
      sendContactQuery(email, name, message),
      {
        pending: {
          render: () => {
            form.setFieldValue('isSubmitting', true);
            return 'Sending your query';
          },
        },
        error: 'Failed to send your query',
        success: 'Your query has been sent. Please expect a response with in 2 working days.',
      },
      {
        position: 'bottom-center',
      })

      .then(() => {
        form.reset();
      })
      .catch((error) => {
        console.log('Erorr while sending your query.', error);
      })
      .finally(() => {
        form.setFieldValue('isSubmitting', false);
      });
  };

  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList />

          <Group mt="xl">{icons}</Group>
        </div>
        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
          <div className={classes.form}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Name"
              placeholder="John Doe"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Textarea
              required
              label="Your message"
              placeholder="I need help with insurance claim"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
              key={form.key('message')}
              {...form.getInputProps('message')}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={form.values.isSubmitting} className={classes.control}>Send message</Button>
            </Group>
          </div>
        </form>
      </SimpleGrid>
    </div>
  );
}
