import cx from 'clsx';
import { useState } from 'react';
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronDown,
  IconPlus,
  IconEyePlus,
  IconCirclePlus,
  IconCubePlus,
  IconCircleDashedPlus,
  IconCubeSend,
  IconCube,
} from '@tabler/icons-react';
import { useResetRecoilState } from 'recoil';
import classes from './ProfileMenu.module.css';
import { UserInfoState } from '@/interfaces/common';
import { atomAuthState } from '@/state/atoms';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/Router';
import { useClaim } from '@/hooks/useClaim';

const ProfileMenu: React.FC<{ user: UserInfoState }> = ({ user }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { createNewClaim } = useClaim();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const resetAuthState = useResetRecoilState(atomAuthState);

  const avatarText = [user.firstName,user.lastName].map(str => str.charAt(0)).join('');

  const handleSignOut = () => {
    resetAuthState();
  };

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar src={user.image} color="cyan" radius="xl">{avatarText}</Avatar>
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.firstName + " " + user.lastName}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate(paths.claimsList)}
          leftSection={
            <IconCube
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
        >
          My Claims
        </Menu.Item>
        <Menu.Item
          onClick={createNewClaim}
          leftSection={
            <IconPlus
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          New Claim
        </Menu.Item>
        {/* <Menu.Item
          leftSection={
            <IconMessage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>
*/}
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Account settings
        </Menu.Item>
        {/* <Menu.Item
          leftSection={
            <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Change account
        </Menu.Item> */}
        <Menu.Item
          color="red"
          onClick={handleSignOut}
          leftSection={
            <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
