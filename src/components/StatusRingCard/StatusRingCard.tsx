import { Text, Card, RingProgress, Group, useMantineTheme, Center, Avatar, ActionIcon, rem, Divider, Button } from '@mantine/core';
import React from 'react';
import { upperFirst } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { IconExternalLink, IconTrash } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import classes from './StatsRingCard.module.css';
import { StatsRingProps } from '@/interfaces/claims';
import { paths } from '@/Router';
import { sanitise } from '@/utils/functions';
import { deleteClaim } from '@/actions/claims';
import { atomClaimsList } from '@/state/atoms';

const stats = [
  { value: 447, label: 'Remaining' },
  { value: 76, label: 'In progress' },
];

const StatsRingCard: React.FC<StatsRingProps> = ({ _id, status, details }) => {
  const [claimsList, setClaimsList] = useRecoilState(atomClaimsList);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const completed = 1887;
  const total = 2334;

  const handleViewDetails = () => {
    navigate(sanitise(paths.claimsDetails, { claimId: _id }));
  };

  const handleDelete = () => {
    toast.promise(deleteClaim(_id), {
      pending: 'Deleting...',
      error: 'Failed to delete claim ',
      success: 'Deleted successfully',
    })
      .then(() => {
        setClaimsList(claimsList.filter(claim => claim._id !== _id));
      });
  };

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            Bill Wormeater
          </Text>
        </Center>

        <Group justify="center">
          <ActionIcon className={classes.action} onClick={handleDelete}>
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
            />
          </ActionIcon>
          <Button variant="default" onClick={handleViewDetails} color={theme.colors.red[6]} leftSection={<IconExternalLink color={theme.colors.yellow[7]} size={14} />} size="compact-sm">Open</Button>
        </Group>
      </Group>
      <Divider my={10} ml="-10%" w="120%" />
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {details.insurance_type}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {details.claim_amount}
            </Text>
            <Text fz="xs" c="dimmed">
              {details.insurance_provider}
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>
        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((completed / total) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  {upperFirst(status)}
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default StatsRingCard;
