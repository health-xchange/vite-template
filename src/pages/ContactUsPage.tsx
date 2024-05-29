import { Container } from '@mantine/core';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { FaqWithImage } from '@/components/FaqWithImage/FaqWithImage';

export default function ContactUsPage() {
  return (
      <Container size="xl">
        <ContactForm />
        <FaqWithImage />
      </Container>
  );
}
