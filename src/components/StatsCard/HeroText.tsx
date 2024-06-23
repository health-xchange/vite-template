import { Title, Text, Button, Container, ActionIcon, Box, Stack } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import React from 'react';
import { IconCheck } from '@tabler/icons-react';

interface HeroTextProps {
  title: string;
  titleHighlighted: string;
  description: string;
  primaryActnLabel: string;
  secondaryActnLabel: string;
  primaryAction: () => void,
  secondaryAction: () => void
}

export const HeroText: React.FC<HeroTextProps> = ({ title, titleHighlighted, description, primaryActnLabel, secondaryActnLabel, primaryAction, secondaryAction }) => {

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <Stack className={classes.inner}>
        <ActionIcon mb={'lg'} radius={'xl'} aria-label="We have received your claim information" size="xl" color="lime.4" c={'green'}>
          <IconCheck size={40} color='white' />
        </ActionIcon>
        <Title className={classes.title}>
          {title}{' '}
          <Text component="span" className={classes.highlight} inherit>
            {titleHighlighted}
          </Text>{' '}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            {description}
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="sm" variant="default" color="gray" onClick={secondaryAction}>
            {secondaryActnLabel}
          </Button>
          <Button className={classes.control} size="sm" onClick={primaryAction}>
            {primaryActnLabel}
          </Button>
        </div>
      </Stack>
    </Container>
  );
}