import { Title, Text, Anchor } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          BlueGuard AI
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Get your insurance claim approved with the help of specially trained AI bot
        suggestions and industry experts. To get started <NavLink to="/register"><Anchor component="button" underline="never">Register</Anchor></NavLink> your acconut now to talk to our AI bot / expert team.
      </Text>
    </>
  );
}
