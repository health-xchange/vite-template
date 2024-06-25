import { Text, Card, RingProgress, Group, useMantineTheme, Center, Avatar, Divider, Button, ActionIcon, rem } from '@mantine/core';
import React from 'react';
import { upperFirst } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { IconExternalLink, IconTrash } from '@tabler/icons-react';
import classes from './StatsRingCard.module.css';
import { Claim } from '@/interfaces/claims';
import { paths } from '@/Router';
import { getClaimStatus, sanitise } from '@/utils/functions';
import { toast } from 'react-toastify';
import { deleteClaim } from '@/actions/claims';

interface StatsRingProps {
  claim: Claim
}

const StatsRingCard: React.FC<StatsRingProps> = ({ claim }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(sanitise(paths.claimsDetails, { claimId: claim._id }));
  };

  const handleDelete = () => {
    toast.promise(deleteClaim(claim._id), {
      pending: 'Deleting...',
      error: 'Failed to delete claim ',
      success: 'Deleted successfully',
    })
  };

  const stats = [
    { value: `${claim.details.claim_amount}`, label: 'Claim Amount' },
    { value: claim.details.criticalInfo?.addl_policy_number, label: 'Policy Number' },
  ];

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label} c={stat.value ? '' : 'dimmed'}>{stat.value || 'Not Provided'}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  const status = getClaimStatus(claim.status);

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
          <Text fz="sm" inline c={(claim.details.first_name || claim.details.last_name) ? '' : 'dimmed'}>
            {(claim.details.first_name + " " + claim.details.last_name).trim() || "Not Provided"}
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
          <div>
            <Text c={'cyan'} fz="md" className={classes.label}>
              {claim._id}
            </Text>
            <Text fz="xs" c="dimmed">
              Claim Id
            </Text>
          </div>
          <div>
            <Text fz={'md'} className={classes.lead} mt={'sm'} c={claim.details.insurance_provider ? '' : 'dimmed'}>
              {claim.details.insurance_provider || 'Not Provided'}
            </Text>
            <Text fz="xs" c="dimmed">
              Insurance Provider
            </Text>
          </div>
          <Group mt="sm">{items}</Group>
        </div>
        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={120}
            sections={[{ value: status.value * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {(status.value * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  {status.label}
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
