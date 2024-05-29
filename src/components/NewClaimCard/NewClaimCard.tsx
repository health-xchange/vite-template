import {
  ActionIcon,
  Card,
  Center,
  rem,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import classes from './NewClaimCard.module.css';

export default function NewClaimCard() {
  return (
    <Card withBorder padding="lg">
      <Center className={classes.newclaim}>
        <NavLink to="/claims/new">
          <ActionIcon color="blue" variant="light" radius="xl" size="xl">
            <IconPlus style={{ width: rem(22), height: rem(22) }} />
          </ActionIcon>
        </NavLink>
      </Center>
    </Card>
  );
}
