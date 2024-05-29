import { Container } from '@mantine/core';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';
import { AuthenticationPagesProps } from '@/interfaces/common';

const Authentication: React.FC<AuthenticationPagesProps> = ({ authType }) => (
      <Container size="xl">
        <Container size="xs">
          <AuthenticationForm authType={authType} />
        </Container>
      </Container>
  );

export default Authentication;
