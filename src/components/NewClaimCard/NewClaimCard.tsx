import {
  ActionIcon,
  Card,
  Center,
  rem,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './NewClaimCard.module.css';

const NewClaimCard:React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <Card withBorder padding="lg">
      <Center className={classes.newclaim}>
        <ActionIcon color="blue" variant="light" radius="xl" size="xl" onClick={onClick}>
          <IconPlus style={{ width: rem(22), height: rem(22) }} />
        </ActionIcon>
      </Center>
    </Card>
  );

export default NewClaimCard;
