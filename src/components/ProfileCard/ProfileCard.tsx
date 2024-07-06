import React from 'react';
import { Avatar, Text, Button, Paper, Group, Stack } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { UserInfoState } from '@/interfaces/common';
import Copy from '@/ReusableComps/Copy';

interface ProfileCardProps {
  user: UserInfoState
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Stack align="center">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text ta="center" fz="lg" fw={500} mt="md">
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <Text ta="center" c="dimmed" fz="sm">
          <Group align="center" justify="center">
            {user.email} <Copy value={user.email} />
          </Group>
        </Text>
        {/* <Button w="fit-content" c="red" leftSection={<IconTrash size={14} />} variant="default">
          Delete my account
        </Button> */}
      </Stack>
    </Paper>
  );

export default ProfileCard;
