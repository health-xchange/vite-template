import { Image, Container, Title, Button, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './HeroSection.module.css';

interface HeroSectionProps {
  title: string | ReactNode;
  description: string | ReactNode;
  image: string | ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, actionButton, image }) => {
  const navigate = useNavigate();

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            {title}
          </Title>
          <Text c="dimmed" mt="md">
            {description}
          </Text>
          <Group mt={30}>
            {
              actionButton && <Button radius="xl" size="md" className={classes.control} onClick={actionButton.onClick}>
                {actionButton.label}
                              </Button>
            }
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
};

export default HeroSection;
