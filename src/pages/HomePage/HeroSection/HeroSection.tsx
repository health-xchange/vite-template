import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, Paper } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './intro.svg';
import classes from './HeroSection.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  // onLoad: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ }) => {
  const navigate = useNavigate();

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Fight your unfair insurance denials for <span className={classes.highlight}>just $25</span>
            {/* . Win your claim, or get your money back – GUARANTEED! */}
            {/* A <span className={classes.highlight}>modern</span> React <br /> components library */}
          </Title>
          <Text c="dimmed" mt="md">
            At BlueGuard AI, we’re dedicated to fighting for your medical insurance claims at a price you
            can afford. For just $25, our expert case managers, backed by powerful AI, steps into the ring to
            challenge unjust claim denials on your behalf!
          </Text>

          {/* <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all components and hooks
              export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
              any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </List.Item>
          </List> */}

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} onClick={() => {
              navigate('/register');
            }}>
              Sign Up
            </Button>
            {/* <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button> */}
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
};

export default HeroSection;