import { Container } from '@mantine/core';
import { RegistrationForm } from '@/components/AuthenticationForm/AuthenticationForm';

const Authentication: React.FC = () => (
      <Container size="xl">
        <Container size="xs">
          <RegistrationForm />
        </Container>
      </Container>
  );

export default Authentication;
